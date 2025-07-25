import useEmblaCarousel from 'embla-carousel-react';
import { useMemo } from 'react';

import { useCarouselArrows } from './use-carousel-arrows';
import { useCarouselAutoPlay } from './use-carousel-auto-play';
import { useCarouselAutoScroll } from './use-carousel-auto-scroll';
import { useCarouselDots } from './use-carousel-dots';
import { useParallax } from './use-carousel-parallax';
import { useCarouselProgress } from './use-carousel-progress';
import { useThumbs } from './use-thumbs';

// ----------------------------------------------------------------------

export const useCarousel = (options?: any, plugins?: any) => {
  const [mainRef, mainApi] = useEmblaCarousel(options, plugins);

  const { disablePrev, disableNext, onClickPrev, onClickNext } = useCarouselArrows(mainApi);

  const pluginNames = plugins?.map((plugin: any) => plugin.name);

  const _dots = useCarouselDots(mainApi);

  const _autoplay = useCarouselAutoPlay(mainApi);

  const _autoScroll = useCarouselAutoScroll(mainApi);

  const _progress = useCarouselProgress(mainApi);

  const _thumbs = useThumbs(mainApi, options?.thumbs);

  useParallax(mainApi, options?.parallax);

  const controls = useMemo(() => {
    if (pluginNames?.includes('autoplay')) {
      return {
        onClickPrev: () => _autoplay.onClickAutoplay(onClickPrev),
        onClickNext: () => _autoplay.onClickAutoplay(onClickNext),
      };
    }
    if (pluginNames?.includes('autoScroll')) {
      return {
        onClickPrev: () => _autoScroll.onClickAutoplay(onClickPrev),
        onClickNext: () => _autoScroll.onClickAutoplay(onClickNext),
      };
    }
    return {
      onClickPrev,
      onClickNext,
    };
  }, [_autoScroll, _autoplay, onClickNext, onClickPrev, pluginNames]);

  return {
    options: {
      ...options,
      ...mainApi?.internalEngine().options,
    },
    pluginNames,
    mainRef,
    mainApi,
    // arrows
    arrows: {
      disablePrev,
      disableNext,
      onClickPrev: controls.onClickPrev,
      onClickNext: controls.onClickNext,
    },
    // dots
    dots: _dots,
    // thumbs
    thumbs: _thumbs,
    // progress
    progress: _progress,
    // autoplay
    autoplay: _autoplay,
    autoScroll: _autoScroll,
  };
};
