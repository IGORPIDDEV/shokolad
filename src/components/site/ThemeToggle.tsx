"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

function useMounted() {
  return React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  )
}

export function ThemeToggle() {
  const mounted = useMounted()
  const { resolvedTheme, setTheme } = useTheme()

  if (!mounted) {
    return (
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="rounded-full"
        aria-label="Перемкнути тему"
        disabled
      >
        <Sun className="h-5 w-5" />
      </Button>
    )
  }

  const isDark = resolvedTheme === "dark"

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className="rounded-full"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Перемкнути тему"
    >
      {isDark ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
    </Button>
  )
}