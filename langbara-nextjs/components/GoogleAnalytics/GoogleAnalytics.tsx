import React from 'react'
import Script from "next/script";

export const GoogleAnalytics = () => {
  return (
    <>
        {/* Google tag (gtag.js) */}
        <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-9BKSWYRWPB"/>
        <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-9BKSWYRWPB');
            `
        }}
        />
    </>
  )
}
