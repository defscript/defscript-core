
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