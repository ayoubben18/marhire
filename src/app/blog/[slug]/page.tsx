
import * as React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import { getArticleBySlug, getArticles } from '@/lib/blog';
import { Calendar, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Breadcrumbs } from '@/components/breadcrumbs';

type ArticlePageProps = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug);

  if (!article) {
    return {
      title: 'Article Not Found | MarHire Blog',
    };
  }

  return {
    title: `${article.title} | MarHire Blog`,
    description: article.description,
    openGraph: {
        title: article.title,
        description: article.description,
        type: 'article',
        publishedTime: new Date(article.date).toISOString(),
        authors: [article.author],
        images: [
            {
                url: article.image,
                width: 1200,
                height: 630,
                alt: article.title,
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: article.title,
        description: article.description,
        images: [article.image],
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const article = await getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: article.title, href: `/blog/${article.slug}` }
  ];

  return (
    <article className="py-8 md:py-12">
        <div className="container max-w-4xl">
             <Breadcrumbs items={breadcrumbItems} />
            <header className="my-6 text-center">
                 <Badge variant="secondary" className="mb-2">{article.category}</Badge>
                <h1 className="font-headline text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                    {article.title}
                </h1>
                <div className="mt-4 flex justify-center items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                        <Calendar className="h-4 w-4" />
                        <span>{article.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <User className="h-4 w-4" />
                        <span>By {article.author}</span>
                    </div>
                </div>
            </header>

            <div className="relative aspect-video w-full overflow-hidden rounded-2xl my-8">
                <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover"
                    data-ai-hint={article.imageHint}
                    priority
                />
            </div>

            <div
                className="prose max-w-none dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: article.content }}
            />
        </div>
    </article>
  );
}
