import { useState, useEffect, useRef } from 'react';
import { Copy, Check } from 'lucide-react';
import Prism from 'prismjs';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-plsql';

interface CodeBlockProps {
    code: string;
    language?: 'plsql' | 'sql' | 'javascript';
    title?: string;
    showLineNumbers?: boolean;
    maxHeight?: number;
}

export default function CodeBlock({
    code,
    language = 'plsql',
    title,
    showLineNumbers = true,
    maxHeight = 400,
}: CodeBlockProps) {
    const [copied, setCopied] = useState(false);
    const codeRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (codeRef.current) {
            Prism.highlightElement(codeRef.current);
        }
    }, [code]);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const lines = code.split('\n');

    return (
        <div className="rounded-lg overflow-hidden border border-slate-700 bg-slate-900">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
                <span className="text-sm font-medium text-slate-300">
                    {title || language.toUpperCase()}
                </span>
                <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 px-2 py-1 text-xs text-slate-400 hover:text-slate-200 hover:bg-slate-700 rounded transition-colors"
                >
                    {copied ? (
                        <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400">Copied!</span>
                        </>
                    ) : (
                        <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy</span>
                        </>
                    )}
                </button>
            </div>

            {/* Code */}
            <div
                className="overflow-auto"
                style={{ maxHeight: `${maxHeight}px` }}
            >
                <div className="flex">
                    {showLineNumbers && (
                        <div className="flex-shrink-0 py-4 pr-4 pl-4 text-right select-none">
                            {lines.map((_, i) => (
                                <div
                                    key={i}
                                    className="text-xs leading-6 text-slate-600 font-mono"
                                >
                                    {i + 1}
                                </div>
                            ))}
                        </div>
                    )}
                    <pre className="flex-1 py-4 pr-4 overflow-x-auto">
                        <code
                            ref={codeRef}
                            className={`language-${language} text-sm leading-6 font-mono`}
                        >
                            {code}
                        </code>
                    </pre>
                </div>
            </div>
        </div>
    );
}
