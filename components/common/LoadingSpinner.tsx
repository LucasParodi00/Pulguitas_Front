export const LoadingSpinner = () => {
    return (
        <div className="flex items-center justify-center min-h-[200px] md:min-h-[400px]">
            <div className="animate-spin rounded-full h-10 w-10 md:h-12 md:w-12 border-b-2 border-primary"></div>
        </div>
    );
};
