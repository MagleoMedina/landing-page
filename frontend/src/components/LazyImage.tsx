import { useCallback, useEffect, useRef, useState, type ImgHTMLAttributes } from 'react'
import './LazyImage.css'

interface LazyImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  className?: string
}

export default function LazyImage({ className, alt, src, ...rest }: LazyImageProps) {
  const [loaded, setLoaded] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const img = imgRef.current
    if (img?.complete && img.naturalWidth > 0) {
      setLoaded(true)
    }
  }, [src])

  const handleLoad = useCallback(() => setLoaded(true), [])
  const handleError = useCallback(() => setLoaded(true), [])

  return (
    <span className={`lazy-wrap${className ? ` ${className}` : ''}`}>
      {!loaded && <span className="lazy-spinner" aria-hidden="true" />}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        {...rest}
        className={`lazy-img${loaded ? ' loaded' : ''}`}
        onLoad={handleLoad}
        onError={handleError}
      />
    </span>
  )
}