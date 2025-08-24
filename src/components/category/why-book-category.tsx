
import * as React from 'react';

type Feature = {
    icon: React.ElementType;
    title: string;
    description: string;
}

type WhyBookCategoryProps = {
    title: string;
    features: Feature[];
}

export function WhyBookCategory({ title, features }: WhyBookCategoryProps) {
  return (
    <section className="w-full">
      <div className="container">
        <div className="text-center">
            <h2 className="font-headline text-2xl md:text-3xl font-bold tracking-tight text-foreground">
              {title}
            </h2>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center p-6 bg-card rounded-2xl shadow-sm border">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                    <feature.icon className="h-6 w-6" />
                </div>
              <h3 className="font-headline text-lg font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
