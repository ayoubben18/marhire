
import { Skeleton } from './ui/skeleton';

export const SearchTabsFallback = () => (
    <div className="bg-background p-4 rounded-2xl shadow-lg border w-full max-w-5xl mx-auto">
        <Skeleton className="h-10 w-1/2 mx-auto mb-4" />
        <div className="grid lg:grid-cols-12 gap-3">
            <div className="lg:col-span-10 grid grid-cols-1 lg:grid-cols-12 items-end gap-3 w-full">
                <Skeleton className="h-12 w-full lg:col-span-3" />
                <Skeleton className="h-12 w-full lg:col-span-2" />
                <Skeleton className="h-12 w-full lg:col-span-2" />
                <Skeleton className="h-12 w-full lg:col-span-2" />
                <Skeleton className="h-12 w-full lg:col-span-2" />
            </div>
            <Skeleton className="h-12 w-full lg:col-span-2" />
        </div>
    </div>
);
