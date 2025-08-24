
import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getArticles } from '@/lib/blog';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

export async function BlogSection() {
  const allArticles = await getArticles();
  const articles = allArticles.slice(0, 6); // Fetch a few more for the carousel

  return (
    <section>
      <div className="text-center">
        <h2 className="font-headline text-2xl md:text-3xl font-bold tracking-tight text-foreground">
          From Our Travel Blog
        </h2>
        <p className="mt-3 text-base text-muted-foreground max-w-2xl mx-auto">
          Get insider tips, travel guides, and inspiration for your next Moroccan adventure.
        </p>
      </div>

      <div className="mt-10 relative">
        <Carousel
            opts={{
            align: "start",
            loop: true,
            }}
            className="w-full"
        >
            <CarouselContent className="-ml-2 md:-ml-4">
            {articles.map((article) => (
                <CarouselItem key={article.slug} className="basis-full md:basis-1/2 lg:basis-1/3 pl-2 md:pl-4">
                    <div className="p-1 h-full">
                        <Link href={`/blog/${article.slug}`} className="group block h-full">
                        <Card className="h-full overflow-hidden rounded-2xl transition-shadow duration-300 hover:shadow-xl flex flex-col">
                            <CardContent className="p-0 flex-1 flex flex-col">
                            <div className="relative aspect-video w-full">
                                <Image
                                src={article.image}
                                alt={article.title}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                data-ai-hint={article.imageHint}
                                />
                            </div>
                            <div className="p-6 flex flex-col flex-1">
                                <Badge variant="secondary" className="mb-2 w-fit">{article.category}</Badge>
                                <h3 className="font-headline text-lg font-bold leading-tight text-foreground group-hover:text-primary transition-colors">
                                {article.title}
                                </h3>
                                <p className="mt-2 text-sm text-muted-foreground line-clamp-2 flex-1">{article.description}</p>
                                <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                                    <span>{article.date}</span>
                                    <div className="flex items-center gap-1 font-semibold text-foreground group-hover:text-primary transition-colors">
                                        Read More <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                                    </div>
                                </div>
                            </div>
                            </CardContent>
                        </Card>
                        </Link>
                    </div>
                </CarouselItem>
            ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 h-10 w-10 bg-white/80 hover:bg-white text-foreground border-slate-300 shadow-md hidden md:flex" />
            <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 h-10 w-10 bg-white/80 hover:bg-white text-foreground border-slate-300 shadow-md hidden md:flex" />
        </Carousel>
      </div>

      <div className="mt-10 text-center">
        <Button asChild variant="outline" size="lg">
          <Link href="/blog">
            Read More Articles <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
