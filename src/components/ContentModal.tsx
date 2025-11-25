import React from 'react'
import SafeRichText from './safeHtml/SafeRichText'

const ContentModal = ({ content }: { content: string }) => {
    return (
        <SafeRichText
         className="mt-4 mb-0 text-sm text-gray-700"
            html={content}


        />
    )
}

export default ContentModal
