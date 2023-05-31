import { Helmet } from "react-helmet";

interface SEOProps {
    title?: string;
    description?: string;
    canonicalUrl?: string;
}

export default function SEO(props: SEOProps) {
    return (
        <Helmet>
            <meta charSet="utf-8" />
            {props.title &&
                <title>{props.title}</title>
            }
            {props.description &&
                <meta name="description" content={props.description} />
            }
            {props.canonicalUrl &&
                <link rel="canonical" href={props.canonicalUrl} />
            }
        </Helmet>
    );
}