import "./globals.css";
import Script from "next/script";

export const metadata = {
    title: "Photography Portal | Team Alpha",
    description: "Web site created using Next.js for premium photography services.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body>
                <LayoutContent>{children}</LayoutContent>
                <Script
                    src="https://checkout.razorpay.com/v1/checkout.js"
                    strategy="beforeInteractive"
                />
            </body>
        </html>
    );
}

// Separate component for client-side state in layout
import ClientLayoutWrapper from "./ClientLayoutWrapper";

function LayoutContent({ children }) {
    return <ClientLayoutWrapper>{children}</ClientLayoutWrapper>;
}
