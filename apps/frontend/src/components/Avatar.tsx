// components/ui/avatar.tsx
import * as React from "react"
import { cn } from "@/lib/utils"

// Tipos base
interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl"
  shape?: "circle" | "square"
}

interface AvatarImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  asChild?: boolean
  onLoadingStatusChange?: (loaded: boolean) => void
}

interface AvatarFallbackProps extends React.HTMLAttributes<HTMLSpanElement> {
  delayMs?: number
  asChild?: boolean
}

// Componente principal Avatar
const AvatarRoot = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, size = "md", shape = "circle", ...props }, ref) => {
    const sizeClasses = {
      sm: "h-8 w-8",
      md: "h-10 w-10",
      lg: "h-12 w-12",
      xl: "h-16 w-16",
    }

    const shapeClasses = {
      circle: "rounded-full",
      square: "rounded-md",
    }

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex shrink-0 overflow-hidden",
          sizeClasses[size],
          shapeClasses[shape],
          className
        )}
        {...props}
      />
    )
  }
)
AvatarRoot.displayName = "Avatar"

// Componente AvatarImage
export const AvatarImage = React.forwardRef<HTMLImageElement, AvatarImageProps>(
  ({ className, src, alt, onLoadingStatusChange, ...props }, ref) => {
    const [status, setStatus] = React.useState<"loading" | "loaded" | "error">("loading")

    React.useEffect(() => {
      if (!src) {
        setStatus("error")
        return
      }

      const image = new window.Image()
      image.src = typeof src === "string" ? src : URL.createObjectURL(src)
      image.onload = () => {
        setStatus("loaded")
        onLoadingStatusChange?.(true)
      }
      image.onerror = () => {
        setStatus("error")
        onLoadingStatusChange?.(false)
      }
    }, [src, onLoadingStatusChange])

    if (status !== "loaded") return null

    return (
      <img
        ref={ref}
        src={src}
        alt={alt}
        className={cn("aspect-square h-full w-full object-cover", className)}
        {...props}
      />
    )
  }
)
AvatarImage.displayName = "AvatarImage"

// Componente AvatarFallback
export const AvatarFallback = React.forwardRef<HTMLSpanElement, AvatarFallbackProps>(
  ({ className, delayMs, children, ...props }, ref) => {
    const [canRender, setCanRender] = React.useState(delayMs === undefined)

    React.useEffect(() => {
      if (delayMs === undefined) return

      const timerId = setTimeout(() => {
        setCanRender(true)
      }, delayMs)

      return () => clearTimeout(timerId)
    }, [delayMs])

    return canRender ? (
      <span
        ref={ref}
        className={cn(
          "flex h-full w-full items-center justify-center bg-gray-100 text-gray-600",
          className
        )}
        {...props}
      >
        {children || (
          <svg
            className="h-2/3 w-2/3"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 4a4 4 0 014 4 4 4 0 01-4 4 4 4 0 01-4-4 4 4 0 014-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4z" />
          </svg>
        )}
      </span>
    ) : null
  }
)
AvatarFallback.displayName = "AvatarFallback"

// Componente AvatarGroup
interface AvatarGroupProps extends AvatarProps {
  max?: number
  spacing?: "sm" | "md" | "lg"
}

const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ children, max = 3, spacing = "md", className, ...props }, ref) => {
    const spacingClasses = {
      sm: "-space-x-2",
      md: "-space-x-3",
      lg: "-space-x-4",
    }

    const avatars = React.Children.toArray(children)
    const visibleAvatars = max ? avatars.slice(0, max) : avatars
    const excess = max ? avatars.length - max : 0

    return (
      <div
        ref={ref}
        className={cn("flex items-center", spacingClasses[spacing], className)}
        {...props}
      >
        {visibleAvatars.map((avatar, index) => (
          <div key={index} className="ring-2 ring-white">
            {avatar}
          </div>
        ))}
        {excess > 0 && (
          <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-xs font-medium text-gray-600 ring-2 ring-white">
            +{excess}
          </div>
        )}
      </div>
    )
  }
)
AvatarGroup.displayName = "AvatarGroup"

// Exportamos los componentes
export const Avatar = Object.assign(AvatarRoot, {
  Image: AvatarImage,
  Fallback: AvatarFallback,
  Group: AvatarGroup,
})