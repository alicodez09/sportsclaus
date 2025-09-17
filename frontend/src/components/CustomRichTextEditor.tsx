"use client"

import type React from "react"
import { useRef, useCallback, useEffect, useState } from "react"
// import { Button } from "@/components/ui/button"
// import { cn } from "@/lib/utils"

interface CustomRichTextEditorProps {
    value?: string
    onChange?: (value: string) => void
    placeholder?: string
    className?: string
    name?: string
    id?: string
}

interface ToolbarButtonProps {
    command: string
    value?: string
    icon: React.ReactNode
    title: string
    isActive?: boolean
    onClick: (command: string, value?: string) => void
}

const ToolbarButton: React.FC<ToolbarButtonProps> = ({
    command,
    value,
    icon,
    title,
    isActive,
    onClick,
}) => (
    <button
        type="button"
        // variant={isActive ? "default" : "outline"}
        // size="sm"
        className="h-8 w-8 p-0 text-black"
        title={title}
        onClick={() => onClick(command, value)}
    >
        {icon}
    </button>
)

export const CustomRichTextEditor: React.FC<CustomRichTextEditorProps> = ({
    value = "",
    onChange,
    placeholder = "Start typing...",
    // className,
    name,
    id,
}) => {
    const editorRef = useRef<HTMLDivElement>(null)
    const [isActive, setIsActive] = useState<Record<string, boolean>>({})

    // Initialize editor content
    useEffect(() => {
        if (editorRef.current && value !== editorRef.current.innerHTML) {
            editorRef.current.innerHTML = value
        }
    }, [value])

    // Update active states
    const updateActiveStates = useCallback(() => {
        const activeStates: Record<string, boolean> = {}

        try {
            activeStates.bold = document.queryCommandState("bold")
            activeStates.italic = document.queryCommandState("italic")
            activeStates.underline = document.queryCommandState("underline")
            activeStates.strikeThrough =
                document.queryCommandState("strikeThrough")
            activeStates.justifyLeft = document.queryCommandState("justifyLeft")
            activeStates.justifyCenter =
                document.queryCommandState("justifyCenter")
            activeStates.justifyRight =
                document.queryCommandState("justifyRight")
            activeStates.insertOrderedList =
                document.queryCommandState("insertOrderedList")
            activeStates.insertUnorderedList = document.queryCommandState(
                "insertUnorderedList",
            )
        } catch (error) {
            // Ignore errors from queryCommandState
        }

        setIsActive(activeStates)
    }, [])

    // Handle content changes
    const handleInput = useCallback(() => {
        if (editorRef.current && onChange) {
            onChange(editorRef.current.innerHTML)
        }
        updateActiveStates()
    }, [onChange, updateActiveStates])

    // Handle selection changes
    const handleSelectionChange = useCallback(() => {
        updateActiveStates()
    }, [updateActiveStates])

    // Execute formatting commands
    const executeCommand = useCallback(
        (command: string, value?: string) => {
            document.execCommand(command, false, value)
            editorRef.current?.focus()
            updateActiveStates()
            handleInput()
        },
        [handleInput, updateActiveStates],
    )

    // Handle paste events to clean up formatting
    const handlePaste = useCallback(
        (e: React.ClipboardEvent) => {
            e.preventDefault()
            const text = e.clipboardData.getData("text/plain")
            document.execCommand("insertText", false, text)
            handleInput()
        },
        [handleInput],
    )

    // Handle key events
    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent) => {
            // Handle common shortcuts
            if (e.ctrlKey || e.metaKey) {
                switch (e.key) {
                    case "b":
                        e.preventDefault()
                        executeCommand("bold")
                        break
                    case "i":
                        e.preventDefault()
                        executeCommand("italic")
                        break
                    case "u":
                        e.preventDefault()
                        executeCommand("underline")
                        break
                }
            }
        },
        [executeCommand],
    )

    // Add event listeners
    useEffect(() => {
        document.addEventListener("selectionchange", handleSelectionChange)
        return () => {
            document.removeEventListener(
                "selectionchange",
                handleSelectionChange,
            )
        }
    }, [handleSelectionChange])

    return (
        <div>
            {/* Toolbar */}
            <div className="border-border bg-muted/50 flex flex-wrap gap-1 border-b p-2">
                {/* Text Formatting */}
                <div className="flex gap-1">
                    <ToolbarButton
                        command="bold"
                        icon={<strong>B</strong>}
                        title="Bold (Ctrl+B)"
                        isActive={isActive.bold}
                        onClick={executeCommand}
                    />
                    <ToolbarButton
                        command="italic"
                        icon={<em>I</em>}
                        title="Italic (Ctrl+I)"
                        isActive={isActive.italic}
                        onClick={executeCommand}
                    />
                    <ToolbarButton
                        command="underline"
                        icon={<u>U</u>}
                        title="Underline (Ctrl+U)"
                        isActive={isActive.underline}
                        onClick={executeCommand}
                    />
                    <ToolbarButton
                        command="strikeThrough"
                        icon={<s>S</s>}
                        title="Strikethrough"
                        isActive={isActive.strikeThrough}
                        onClick={executeCommand}
                    />
                </div>

                <div className="bg-border mx-1 h-6 w-px" />

                {/* Text Alignment */}
                <div className="flex gap-1">
                    <ToolbarButton
                        command="justifyLeft"
                        icon={
                            <svg
                                className="h-4 w-4"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        }
                        title="Align Left"
                        isActive={isActive.justifyLeft}
                        onClick={executeCommand}
                    />
                    <ToolbarButton
                        command="justifyCenter"
                        icon={
                            <svg
                                className="h-4 w-4"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm2 4a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm-2 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm2 4a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        }
                        title="Align Center"
                        isActive={isActive.justifyCenter}
                        onClick={executeCommand}
                    />
                    <ToolbarButton
                        command="justifyRight"
                        icon={
                            <svg
                                className="h-4 w-4"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm6 4a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1zm-6 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm6 4a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        }
                        title="Align Right"
                        isActive={isActive.justifyRight}
                        onClick={executeCommand}
                    />
                </div>

                <div className="bg-border mx-1 h-6 w-px" />
            </div>

            {/* Editor */}
            <div
                ref={editorRef}
                contentEditable
                suppressContentEditableWarning
                className="focus:ring-ring text-foreground min-h-[120px] p-3 text-black focus:outline-none focus:ring-2 focus:ring-offset-2"
                style={{ wordWrap: "break-word" }}
                onInput={handleInput}
                onPaste={handlePaste}
                onKeyDown={handleKeyDown}
                data-placeholder={placeholder}
                id={id}
                data-name={name}
            />
        </div>
    )
}
