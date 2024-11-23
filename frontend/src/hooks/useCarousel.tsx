import { useEffect, useState } from 'react'

import { CarouselApi } from '@/components/ui/carousel'

export function useCarousel() {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>()
  const [currentCarouselPage, setCurrentCarouselPage] = useState(0)

  useEffect(() => {
    if (!carouselApi) {
      return
    }

    setCurrentCarouselPage(carouselApi.selectedScrollSnap() + 1)

    carouselApi.on('select', () => {
      setCurrentCarouselPage(carouselApi.selectedScrollSnap() + 1)
    })
  }, [carouselApi])

  return {
    setCarouselApi,
    currentCarouselPage,
  }
}
