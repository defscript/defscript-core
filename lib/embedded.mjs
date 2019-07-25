
import {Stack} from "./collections"

const balanced = {
    '{': '}',
    '[': ']',
    '(': ')'
}

const balancedReversed =
  Object
    .keys(balanced)
    .reduce((obj, key) => (obj[balanced[key]] = key, obj),{})

export class EmbeddedLanguage {
    constructor({source, loc, offset, args = [], multiline = false}) {
        this.source = source;       // snippet
        this.loc = loc;             // location information in standard line/column format
        this.offset = offset;       // parent-string offset of source
        this.multiline = multiline; // whether code is multiline or single-line
        this.args = args;           // language modifiers
    }

    compile(api) {
        throw new Error(`Must implement "compile" for your embedded language`);
    }

    transform(api, node) {
        throw new Error(`Must implement "transform" for your embedded language`);
    }
}

export const fetchInterpolation = (string, start = 0) => {
    // this fetches defscript expression interpolation until the end of string
    // or until the defscript is unbalanced by one of '}])'

    const stack = new Stack();
    const stringSet = new Map();

    let inString = false, templated = false, escaped = false;

    for (let i = start; i < string.length; i++) {
        const c = string[i];
        const stringChar = templated ? '"' : "'";

        if (inString) {

            if (escaped) {
                escaped = false;

                continue;
            }

            if (!escaped && c === stringChar) {
                inString = false;
                escaped = false;
                templated = false;

                continue;
            }

            if (!escaped && templated && c === '{') {
                inString = false;
                escaped = false;

                stringSet.add(stack.length);
                stack.push('{');

                continue;
            }

            if (!escaped && c === '\\') {
                escaped = true;

                continue;
            }
        } else {

            if (c === '"' || c === "'") {
                inString = true;
                escaped = false;
                templated = (c === '"');

                continue;
            }

            if (balancedReversed.hasOwnProperty(c)) {
                if (stack.length === 0) {
                    return string.slice(start, i);
                } else {
                    stack.pop();

                    if (stringSet.has(stack.length)) {
                        inString = true;
                        templated = true;
                        escaped = false;

                        stringSet.delete(stack.length);
                    }

                    continue;
                }
            }
        }
    }
}