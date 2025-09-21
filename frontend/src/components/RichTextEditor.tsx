"use client"

import type React from "react"
import { useState, useRef, useCallback, useEffect } from "react"
import {
    Scissors,
    Copy,
    Clipboard,
    Undo,
    Redo,
    Bold,
    Italic,
    Strikethrough,
    Subscript,
    Superscript,
    List,
    ListOrdered,
    IndentIncrease,
    IndentDecrease,
    Quote,
    Link,
    Unlink,
    Flag,
    ImageIcon,
    Table,
    AlignLeft,
    AlignCenter,
    AlignRight,
    AlignJustify,
    Type,
    Maximize,
    Code,
    HelpCircle,
    ChevronDown,
    X,
} from "lucide-react"

interface EditorState {
    bold: boolean
    italic: boolean
    underline: boolean
    strikethrough: boolean
    subscript: boolean
    superscript: boolean
    fontSize: string
    fontFamily: string
    textAlign: string
}

interface RichTextEditorProps {
    value?: string
    onChange?: (value: string) => void
    placeholder?: string
    name?: string
    id?: string
    className?: string
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
    value = "",
    onChange,
    placeholder = "Start typing...",
    name,
    id,
    className = "",
}) => {
    const editorRef = useRef<HTMLDivElement>(null)
    const [isSourceView, setIsSourceView] = useState<boolean>(false)
    const [isFullscreen, setIsFullscreen] = useState<boolean>(false)
    const [editorState, setEditorState] = useState<EditorState>({
        bold: false,
        italic: false,
        underline: false,
        strikethrough: false,
        subscript: false,
        superscript: false,
        fontSize: "14px",
        fontFamily: "Arial",
        textAlign: "left",
    })
    const [linkUrl, setLinkUrl] = useState<string>("")
    const [imageUrl, setImageUrl] = useState<string>("")
    const [isLinkDialogOpen, setIsLinkDialogOpen] = useState<boolean>(false)
    const [isImageDialogOpen, setIsImageDialogOpen] = useState<boolean>(false)
    const [isTableDialogOpen, setIsTableDialogOpen] = useState<boolean>(false)
    const [tableRows, setTableRows] = useState<number>(3)
    const [tableCols, setTableCols] = useState<number>(3)
    const [isFontSizeDropdownOpen, setIsFontSizeDropdownOpen] =
        useState<boolean>(false)
    const [isStylesDropdownOpen, setIsStylesDropdownOpen] =
        useState<boolean>(false)
    const [isFormatDropdownOpen, setIsFormatDropdownOpen] =
        useState<boolean>(false)

    useEffect(() => {
        if (editorRef.current && editorRef.current.innerHTML !== value) {
            editorRef.current.innerHTML = value
        }
    }, [value])

    const updateEditorState = useCallback(() => {
        if (!editorRef.current) return

        const selection = window.getSelection()
        if (!selection || selection.rangeCount === 0) return

        setEditorState({
            bold: document.queryCommandState("bold"),
            italic: document.queryCommandState("italic"),
            underline: document.queryCommandState("underline"),
            strikethrough: document.queryCommandState("strikeThrough"),
            subscript: document.queryCommandState("subscript"),
            superscript: document.queryCommandState("superscript"),
            fontSize: document.queryCommandValue("fontSize") || "14px",
            fontFamily: document.queryCommandValue("fontName") || "Arial",
            textAlign: document.queryCommandValue("justifyLeft")
                ? "left"
                : document.queryCommandValue("justifyCenter")
                  ? "center"
                  : document.queryCommandValue("justifyRight")
                    ? "right"
                    : document.queryCommandValue("justifyFull")
                      ? "justify"
                      : "left",
        })
    }, [])

    const executeCommand = useCallback(
        (command: string, value?: string) => {
            editorRef.current?.focus()
            document.execCommand(command, false, value)
            updateEditorState()
            if (editorRef.current && onChange) {
                onChange(editorRef.current.innerHTML)
            }
        },
        [updateEditorState, onChange],
    )

    const handleContentChange = useCallback(() => {
        if (editorRef.current && onChange) {
            onChange(editorRef.current.innerHTML)
        }
    }, [onChange])

    const handleKeyUp = useCallback(() => {
        updateEditorState()
        handleContentChange()
    }, [updateEditorState, handleContentChange])

    const handleMouseUp = useCallback(() => {
        updateEditorState()
    }, [updateEditorState])

    const insertLink = useCallback(() => {
        if (linkUrl) {
            executeCommand("createLink", linkUrl)
            setLinkUrl("")
            setIsLinkDialogOpen(false)
        }
    }, [linkUrl, executeCommand])

    const insertImage = useCallback(() => {
        if (imageUrl) {
            executeCommand("insertImage", imageUrl)
            setImageUrl("")
            setIsImageDialogOpen(false)
        }
    }, [imageUrl, executeCommand])

    const insertTable = useCallback(() => {
        let tableHTML =
            '<table border="1" style="border-collapse: collapse; width: 100%;">'
        for (let i = 0; i < tableRows; i++) {
            tableHTML += "<tr>"
            for (let j = 0; j < tableCols; j++) {
                tableHTML +=
                    '<td style="padding: 8px; border: 1px solid #ccc;">&nbsp;</td>'
            }
            tableHTML += "</tr>"
        }
        tableHTML += "</table>"
        executeCommand("insertHTML", tableHTML)
        setIsTableDialogOpen(false)
    }, [tableRows, tableCols, executeCommand])

    const toggleSourceView = useCallback(() => {
        if (isSourceView) {
            if (editorRef.current && onChange) {
                editorRef.current.innerHTML = value
            }
        } else {
            // Switch to source view - content is already in value prop
        }
        setIsSourceView(!isSourceView)
    }, [isSourceView, value, onChange])

    const toggleFullscreen = useCallback(() => {
        setIsFullscreen(!isFullscreen)
    }, [isFullscreen])

    const handleSourceChange = useCallback(
        (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            if (onChange) {
                onChange(e.target.value)
            }
        },
        [onChange],
    )

    useEffect(() => {
        const editor = editorRef.current
        if (editor) {
            editor.addEventListener("keyup", handleKeyUp)
            editor.addEventListener("mouseup", handleMouseUp)
            editor.addEventListener("input", handleContentChange)

            return () => {
                editor.removeEventListener("keyup", handleKeyUp)
                editor.removeEventListener("mouseup", handleMouseUp)
                editor.removeEventListener("input", handleContentChange)
            }
        }
    }, [handleKeyUp, handleMouseUp, handleContentChange])

    const fontSizes = [
        "8px",
        "10px",
        "12px",
        "14px",
        "16px",
        "18px",
        "20px",
        "24px",
        "28px",
        "32px",
        "36px",
        "48px",
    ]
    const fontFamilies = [
        "Arial",
        "Georgia",
        "Times New Roman",
        "Courier New",
        "Verdana",
        "Helvetica",
        "Comic Sans MS",
    ]
    const styles = [
        "Normal",
        "Heading 1",
        "Heading 2",
        "Heading 3",
        "Heading 4",
        "Heading 5",
        "Heading 6",
    ]
    const formats = ["Paragraph", "Div", "Pre", "Address"]

    return (
        <div
            className={`rounded-lg border border-gray-300 bg-white ${isFullscreen ? "fixed inset-0 z-50" : ""} ${className}`}
        >
            {/* First Toolbar Row */}
            <div className="flex items-center gap-1 border-b border-gray-200 bg-gray-50 p-2">
                <Button
                    onClick={() => executeCommand("cut")}
                    className="w-8 p-0"
                    title="Cut"
                >
                    <Scissors className="h-4 w-4" />
                </Button>
                <Button
                    onClick={() => executeCommand("copy")}
                    className="w-8 p-0"
                    title="Copy"
                >
                    <Copy className="h-4 w-4" />
                </Button>
                <Button
                    onClick={() => executeCommand("paste")}
                    className="w-8 p-0"
                    title="Paste"
                >
                    <Clipboard className="h-4 w-4" />
                </Button>

                <Separator />

                <Button
                    onClick={() => executeCommand("undo")}
                    className="w-8 p-0"
                    title="Undo"
                >
                    <Undo className="h-4 w-4" />
                </Button>
                <Button
                    onClick={() => executeCommand("redo")}
                    className="w-8 p-0"
                    title="Redo"
                >
                    <Redo className="h-4 w-4" />
                </Button>

                <Separator />

                <Dropdown
                    isOpen={isFontSizeDropdownOpen}
                    onOpenChange={setIsFontSizeDropdownOpen}
                    trigger={
                        <Button title="Font Size">
                            <Type className="mr-1 h-4 w-4" />
                            <ChevronDown className="h-3 w-3" />
                        </Button>
                    }
                >
                    {fontSizes.map((size) => (
                        <DropdownItem
                            key={size}
                            onClick={() => {
                                const sizeValue =
                                    size === "8px"
                                        ? "1"
                                        : size === "10px"
                                          ? "2"
                                          : size === "12px"
                                            ? "3"
                                            : size === "14px"
                                              ? "4"
                                              : size === "16px"
                                                ? "5"
                                                : size === "18px"
                                                  ? "6"
                                                  : "7"
                                executeCommand("fontSize", sizeValue)
                                setIsFontSizeDropdownOpen(false)
                            }}
                        >
                            {size}
                        </DropdownItem>
                    ))}
                </Dropdown>

                <Separator />

                <Button
                    onClick={() => setIsLinkDialogOpen(true)}
                    className="w-8 p-0"
                    title="Insert Link"
                >
                    <Link className="h-4 w-4" />
                </Button>

                <Button
                    onClick={() => executeCommand("unlink")}
                    className="w-8 p-0"
                    title="Remove Link"
                >
                    <Unlink className="h-4 w-4" />
                </Button>

                <Button className="w-8 p-0" title="Insert Flag">
                    <Flag className="h-4 w-4" />
                </Button>

                <Button
                    onClick={() => setIsImageDialogOpen(true)}
                    className="w-8 p-0"
                    title="Insert Image"
                >
                    <ImageIcon className="h-4 w-4" />
                </Button>

                <Button
                    onClick={() => setIsTableDialogOpen(true)}
                    className="w-8 p-0"
                    title="Insert Table"
                >
                    <Table className="h-4 w-4" />
                </Button>

                <Separator />

                <Button
                    onClick={() => executeCommand("justifyLeft")}
                    className="w-8 p-0"
                    title="Align Left"
                >
                    <AlignLeft className="h-4 w-4" />
                </Button>
                <Button
                    onClick={() => executeCommand("justifyCenter")}
                    className="w-8 p-0"
                    title="Align Center"
                >
                    <AlignCenter className="h-4 w-4" />
                </Button>
                <Button
                    onClick={() => executeCommand("justifyRight")}
                    className="w-8 p-0"
                    title="Align Right"
                >
                    <AlignRight className="h-4 w-4" />
                </Button>
                <Button
                    onClick={() => executeCommand("justifyFull")}
                    className="w-8 p-0"
                    title="Justify"
                >
                    <AlignJustify className="h-4 w-4" />
                </Button>

                <Separator />

                <Button className="w-8 p-0" title="Special Characters">
                    <Type className="h-4 w-4" />
                </Button>

                <Button
                    onClick={toggleFullscreen}
                    className="w-8 p-0"
                    title="Fullscreen"
                >
                    <Maximize className="h-4 w-4" />
                </Button>

                <Button
                    onClick={toggleSourceView}
                    className={`px-2 ${isSourceView ? "bg-gray-200" : ""}`}
                    title="Source View"
                    active={isSourceView}
                >
                    <Code className="mr-1 h-4 w-4" />
                    Source
                </Button>
            </div>

            {/* Second Toolbar Row */}
            <div className="flex items-center gap-1 border-b border-gray-200 bg-gray-50 p-2">
                <Button
                    onClick={() => executeCommand("bold")}
                    className="w-8 p-0 font-bold"
                    title="Bold"
                    active={editorState.bold}
                >
                    <Bold className="h-4 w-4" />
                </Button>
                <Button
                    onClick={() => executeCommand("italic")}
                    className="w-8 p-0 italic"
                    title="Italic"
                    active={editorState.italic}
                >
                    <Italic className="h-4 w-4" />
                </Button>
                <Button
                    onClick={() => executeCommand("strikeThrough")}
                    className="w-8 p-0"
                    title="Strikethrough"
                    active={editorState.strikethrough}
                >
                    <Strikethrough className="h-4 w-4" />
                </Button>

                <Separator />

                <Button
                    onClick={() => executeCommand("subscript")}
                    className="w-8 p-0"
                    title="Subscript"
                    active={editorState.subscript}
                >
                    <Subscript className="h-4 w-4" />
                </Button>
                <Button
                    onClick={() => executeCommand("superscript")}
                    className="w-8 p-0"
                    title="Superscript"
                    active={editorState.superscript}
                >
                    <Superscript className="h-4 w-4" />
                </Button>

                <Separator />

                <Button
                    onClick={() => executeCommand("insertOrderedList")}
                    className="w-8 p-0"
                    title="Numbered List"
                >
                    <ListOrdered className="h-4 w-4" />
                </Button>
                <Button
                    onClick={() => executeCommand("insertUnorderedList")}
                    className="w-8 p-0"
                    title="Bulleted List"
                >
                    <List className="h-4 w-4" />
                </Button>

                <Separator />

                <Button
                    onClick={() => executeCommand("indent")}
                    className="w-8 p-0"
                    title="Increase Indent"
                >
                    <IndentIncrease className="h-4 w-4" />
                </Button>
                <Button
                    onClick={() => executeCommand("outdent")}
                    className="w-8 p-0"
                    title="Decrease Indent"
                >
                    <IndentDecrease className="h-4 w-4" />
                </Button>

                <Separator />

                <Button
                    onClick={() => executeCommand("formatBlock", "blockquote")}
                    className="w-8 p-0"
                    title="Blockquote"
                >
                    <Quote className="h-4 w-4" />
                </Button>

                <Separator />

                <Dropdown
                    isOpen={isStylesDropdownOpen}
                    onOpenChange={setIsStylesDropdownOpen}
                    trigger={
                        <Button title="Styles">
                            Styles
                            <ChevronDown className="ml-1 h-3 w-3" />
                        </Button>
                    }
                >
                    {styles.map((style) => (
                        <DropdownItem
                            key={style}
                            onClick={() => {
                                const tag =
                                    style === "Normal"
                                        ? "div"
                                        : style === "Heading 1"
                                          ? "h1"
                                          : style === "Heading 2"
                                            ? "h2"
                                            : style === "Heading 3"
                                              ? "h3"
                                              : style === "Heading 4"
                                                ? "h4"
                                                : style === "Heading 5"
                                                  ? "h5"
                                                  : style === "Heading 6"
                                                    ? "h6"
                                                    : "div"
                                executeCommand("formatBlock", `<${tag}>`)
                                setIsStylesDropdownOpen(false)
                            }}
                        >
                            {style}
                        </DropdownItem>
                    ))}
                </Dropdown>

                <Dropdown
                    isOpen={isFormatDropdownOpen}
                    onOpenChange={setIsFormatDropdownOpen}
                    trigger={
                        <Button title="Format">
                            Format
                            <ChevronDown className="ml-1 h-3 w-3" />
                        </Button>
                    }
                >
                    {formats.map((format) => (
                        <DropdownItem
                            key={format}
                            onClick={() => {
                                const tag = format.toLowerCase()
                                executeCommand("formatBlock", `<${tag}>`)
                                setIsFormatDropdownOpen(false)
                            }}
                        >
                            {format}
                        </DropdownItem>
                    ))}
                </Dropdown>

                <Separator />

                <Button className="w-8 p-0" title="Help">
                    <HelpCircle className="h-4 w-4" />
                </Button>
            </div>

            {/* Editor Content */}
            <div
                className={`${isFullscreen ? "flex flex-1 flex-col" : "h-96"}`}
            >
                {isSourceView ? (
                    <textarea
                        className="h-full w-full resize-none border-0 bg-white p-4 font-mono text-sm text-gray-900 focus:outline-none"
                        value={value}
                        onChange={handleSourceChange}
                        placeholder="HTML source code..."
                        name={name}
                        id={id}
                    />
                ) : (
                    <div
                        ref={editorRef}
                        contentEditable
                        className="h-full w-full overflow-auto bg-white p-4 text-gray-900 focus:outline-none"
                        style={{
                            minHeight: isFullscreen
                                ? "calc(100vh - 120px)"
                                : "384px",
                        }}
                        suppressContentEditableWarning={true}
                        data-placeholder={placeholder}
                        data-name={name}
                        data-id={id}
                    />
                )}
            </div>

            {/* Link Dialog */}
            <Dialog
                isOpen={isLinkDialogOpen}
                onClose={() => setIsLinkDialogOpen(false)}
                title="Insert Link"
            >
                <div className="space-y-4">
                    <div>
                        <Label htmlFor="link-url">URL</Label>
                        <Input
                            value={linkUrl}
                            onChange={(e) => setLinkUrl(e.target.value)}
                            placeholder="https://example.com"
                        />
                    </div>
                    <Button
                        onClick={insertLink}
                        className="w-full bg-blue-600 text-white hover:bg-blue-700"
                    >
                        Insert Link
                    </Button>
                </div>
            </Dialog>

            {/* Image Dialog */}
            <Dialog
                isOpen={isImageDialogOpen}
                onClose={() => setIsImageDialogOpen(false)}
                title="Insert Image"
            >
                <div className="space-y-4">
                    <div>
                        <Label htmlFor="image-url">Image URL</Label>
                        <Input
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            placeholder="https://example.com/image.jpg"
                        />
                    </div>
                    <Button
                        onClick={insertImage}
                        className="w-full bg-blue-600 text-white hover:bg-blue-700"
                    >
                        Insert Image
                    </Button>
                </div>
            </Dialog>

            {/* Table Dialog */}
            <Dialog
                isOpen={isTableDialogOpen}
                onClose={() => setIsTableDialogOpen(false)}
                title="Insert Table"
            >
                <div className="space-y-4">
                    <div>
                        <Label htmlFor="table-rows">Rows</Label>
                        <Input
                            type="number"
                            value={tableRows}
                            onChange={(e) =>
                                setTableRows(
                                    Number.parseInt(e.target.value) || 3,
                                )
                            }
                            min="1"
                            max="20"
                        />
                    </div>
                    <div>
                        <Label htmlFor="table-cols">Columns</Label>
                        <Input
                            type="number"
                            value={tableCols}
                            onChange={(e) =>
                                setTableCols(
                                    Number.parseInt(e.target.value) || 3,
                                )
                            }
                            min="1"
                            max="10"
                        />
                    </div>
                    <Button
                        onClick={insertTable}
                        className="w-full bg-blue-600 text-white hover:bg-blue-700"
                    >
                        Insert Table
                    </Button>
                </div>
            </Dialog>
        </div>
    )
}

const Button = ({
    children,
    onClick,
    className = "",
    title,
    active = false,
}: {
    children: React.ReactNode
    onClick?: () => void
    className?: string
    title?: string
    active?: boolean
}) => (
    <button
        onClick={onClick}
        title={title}
        className={`inline-flex h-8 items-center justify-center rounded-md px-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${active ? "bg-gray-200 text-gray-900" : "text-gray-700"} ${className}`}
    >
        {children}
    </button>
)

const Separator = () => <div className="mx-1 h-6 w-px bg-gray-300" />

const Dropdown = ({
    trigger,
    children,
    isOpen,
    onOpenChange,
}: {
    trigger: React.ReactNode
    children: React.ReactNode
    isOpen: boolean
    onOpenChange: (open: boolean) => void
}) => (
    <div className="relative">
        <div onClick={() => onOpenChange(!isOpen)}>{trigger}</div>
        {isOpen && (
            <>
                <div
                    className="fixed inset-0 z-10"
                    onClick={() => onOpenChange(false)}
                />
                <div className="absolute left-0 top-full z-20 mt-1 min-w-[120px] rounded-md border border-gray-200 bg-white py-1 shadow-lg">
                    {children}
                </div>
            </>
        )}
    </div>
)

const DropdownItem = ({
    children,
    onClick,
}: {
    children: React.ReactNode
    onClick: () => void
}) => (
    <button
        onClick={onClick}
        className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
    >
        {children}
    </button>
)

const Dialog = ({
    isOpen,
    onClose,
    title,
    children,
}: {
    isOpen: boolean
    onClose: () => void
    title: string
    children: React.ReactNode
}) => {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="fixed inset-0 bg-black bg-opacity-50"
                onClick={onClose}
            />
            <div className="relative mx-4 w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-lg font-semibold">{title}</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>
                {children}
            </div>
        </div>
    )
}

const Input = ({
    value,
    onChange,
    placeholder,
    type = "text",
    min,
    max,
}: {
    value: string | number
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    placeholder?: string
    type?: string
    min?: string
    max?: string
}) => (
    <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        min={min}
        max={max}
        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
)

const Label = ({
    children,
    htmlFor,
}: {
    children: React.ReactNode
    htmlFor?: string
}) => (
    <label
        htmlFor={htmlFor}
        className="mb-1 block text-sm font-medium text-gray-700"
    >
        {children}
    </label>
)

export default RichTextEditor
