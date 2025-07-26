const MovieDetailsSkeleton = () => {
  return (
    <div className="model-top">
      <div className="model-box">
        <div className="content-box">
          <div className="head">
            <div className="frame1">
              {/* Title Skeleton */}
              <div className="h-8 bg-gray-300 rounded-md animate-pulse mb-2 w-3/4"></div>
              <div className="frame2">
                <div className="span">
                  {/* Year, Runtime, Rated Skeleton */}
                  <div className="h-4 bg-gray-300 rounded animate-pulse w-48"></div>
                </div>
              </div>
            </div>

            <div className="frame3">
              {/* Rating Button Skeleton */}
              <div className="btn bg-gray-300 animate-pulse h-8 w-24 rounded"></div>
            </div>
          </div>

          <div className="img-trailer">
            {/* Poster Image Skeleton */}
            <div className="w-full h-96 bg-gray-300 rounded-lg animate-pulse"></div>
          </div>

          <section className="info-section">
            <div className="info">
              {/* Genres Skeleton */}
              <div className="info-gener">
                <div className="gen">
                  <div className="h-[18px] bg-gray-300 rounded animate-pulse w-[80px] mb-1"></div>
                </div>
                <div className="gen-list">
                  <div className="h-[35px] bg-gray-300 rounded animate-pulse w-[70px]"></div>
                  <div className="h-[35px] bg-gray-300 rounded animate-pulse w-[85px]"></div>
                  <div className="h-[35px] bg-gray-300 rounded animate-pulse w-[65px]"></div>
                </div>
              </div>

              {/* Overview Skeleton */}
              <div className="info-overview">
                <div className="h-6 bg-gray-300 rounded animate-pulse w-24 mb-2"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-300 rounded animate-pulse w-full"></div>
                  <div className="h-4 bg-gray-300 rounded animate-pulse w-full"></div>
                  <div className="h-4 bg-gray-300 rounded animate-pulse w-3/4"></div>
                </div>
              </div>

              {/* Type Skeleton */}
              <div className="info-tagline">
                <div className="h-6 bg-gray-300 rounded animate-pulse w-16 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded animate-pulse w-20"></div>
              </div>

              {/* Release Date Skeleton */}
              <div className="info-release">
                <div className="h-6 bg-gray-300 rounded animate-pulse w-28 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded animate-pulse w-32"></div>
              </div>

              {/* Countries Skeleton */}
              <div className="info-country">
                <div className="h-6 bg-gray-300 rounded animate-pulse w-24 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded animate-pulse w-40"></div>
              </div>

              {/* Actors Skeleton */}
              <div className="info-actors">
                <div className="h-6 bg-gray-300 rounded animate-pulse w-16 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded animate-pulse w-80"></div>
              </div>

              {/* Director Skeleton */}
              <div className="info-actors">
                <div className="h-6 bg-gray-300 rounded animate-pulse w-20 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded animate-pulse w-48"></div>
              </div>

              {/* Language Skeleton */}
              <div className="info-language">
                <div className="h-6 bg-gray-300 rounded animate-pulse w-24 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded animate-pulse w-32"></div>
              </div>

              {/* Awards Skeleton */}
              <div className="info-awards">
                <div className="h-6 bg-gray-300 rounded animate-pulse w-20 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded animate-pulse w-64"></div>
              </div>

              {/* BoxOffice Skeleton */}
              <div className="info-revenue">
                <div className="h-6 bg-gray-300 rounded animate-pulse w-24 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded animate-pulse w-28"></div>
              </div>

              {/* Production Skeleton */}
              <div className="info-production">
                <div className="h-6 bg-gray-300 rounded animate-pulse w-28 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded animate-pulse w-44"></div>
              </div>
            </div>

            {/* Visit Homepage Button Skeleton */}
            <div className="visit-home bg-gray-300 animate-pulse h-12 w-48 rounded"></div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsSkeleton;
