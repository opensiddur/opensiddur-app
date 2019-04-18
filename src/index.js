import {EditorState} from "prosemirror-state"
import {EditorView} from "prosemirror-view"
import {Schema, DOMParser} from "prosemirror-model"
import {schema} from "prosemirror-schema-basic"
import {addListNodes} from "prosemirror-schema-list"
import {exampleSetup} from "prosemirror-example-setup"

// Mix the nodes from prosemirror-schema-list into the basic schema to
// create a schema with list support.
const mySchema = new Schema({
    nodes: {
        text: {},
        textnode: {
            content: "text*",
            parseDOM: [{tag: "jf-textnode"}],
            toDOM() { return ["jf-textnode", 0]}},
        p: {
            content: "",
            parseDOM: [{tag: "tei-p"}],
            toDOM() { return ["tei-p", "¶"]}
        },
        anchor: {
            content: "",
            parseDOM: [{tag: "tei-anchor"}],
            toDOM() { return ["tei-anchor", "[A]"]}
        },
        conditional: {
            content: "",
            parseDOM: [{tag: "jf-conditional"}],
            toDOM() { return ["jf-conditional", "[C]"]}
        },
        merged : {
            content: "(textnode | p | anchor | conditional)*",
            parseDOM: [{tag: "jf-merged"}],
            toDOM() { return ["jf-merged", 0]}
        },
        doc: { content: "merged" }
    }
})

window.view = new EditorView(document.querySelector("#editor"), {
    state: EditorState.create({
        doc: DOMParser.fromSchema(mySchema).parse(document.querySelector("#stream")),
        plugins: exampleSetup({schema: mySchema})
    })
})