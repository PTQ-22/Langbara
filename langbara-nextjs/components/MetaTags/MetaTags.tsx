import Head from 'next/head'
import React from 'react'

// https://developers.google.com/search/docs/crawling-indexing/special-tags
// charset and viewport is by default from next
interface MetaTagsProps {
  title ?: string;
  keywords?: string;
  description?: string;
  robots?: string;
}

export const MetaTags = ({title, description, keywords, robots}: MetaTagsProps) => {
  return (
    <Head>
      {title ? <title>{title}</title> : ""}
      {description ? <meta name="description" content={description} /> : ""}
      {keywords ? <meta name="keywords" content={keywords} /> : ""}
      {robots ? <meta name="robots" content={robots} /> : ""}
    </Head>
  )
}
