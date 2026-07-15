# OpenTruth Design System - Developer Guide

## Quick Start

### Using Animations

```typescript
import { motion } from 'framer-motion'
import { fadeInUp, containerVariants, itemVariants, hoverScale } from '@/lib/design-system'

export function MyComponent() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        Item 1
      </motion.div>
      <motion.div variants={itemVariants}>
        Item 2
      </motion.div>
    </motion.div>
  )
}
```

### Using Premium Components

```typescript
import { GlassCard, AnimatedButton, StatCard } from '@/components/ui'

export function Dashboard() {
  return (
    <>
      <GlassCard className="p-6">
        <h2>Welcome</h2>
      </GlassCard>

      <StatCard
        label="Users"
        value="2,345"
        icon={<Users className="w-5 h-5" />}
        change="+12%"
        trend="up"
      />

      <AnimatedButton onClick={() => console.log('clicked')}>
        Submit
      </AnimatedButton>
    </>
  )
}
```

## Animation Variants Reference

### Page Entrance Animations

**fadeInUp** - Fade from transparent, slide up 20px
```typescript
<motion.div variants={fadeInUp}>Content</motion.div>
```

**fadeInDown** - Fade from transparent, slide down 20px
```typescript
<motion.div variants={fadeInDown}>Content</motion.div>
```

**fadeInLeft** - Fade from transparent, slide left 20px
```typescript
<motion.div variants={fadeInLeft}>Content</motion.div>
```

**fadeInRight** - Fade from transparent, slide right 20px
```typescript
<motion.div variants={fadeInRight}>Content</motion.div>
```

**scaleIn** - Fade and scale from 0.95
```typescript
<motion.div variants={scaleIn}>Content</motion.div>
```

### List and Container Animations

**containerVariants** + **itemVariants** - Staggered children
```typescript
<motion.div
  variants={containerVariants}
  initial="hidden"
  animate="visible"
>
  {items.map((item) => (
    <motion.div key={item.id} variants={itemVariants}>
      {item.name}
    </motion.div>
  ))}
</motion.div>
```

## Component API Reference

### GlassCard

Glass morphism card with optional animations.

```typescript
<GlassCard
  className="p-6"
  hoverable={true}
  animated={true}
  onClick={() => {}}
>
  Your content here
</GlassCard>
```

**Props:**
- `className?: string` - Additional Tailwind classes
- `hoverable?: boolean` - Enable hover effects (default: true)
- `animated?: boolean` - Enable entrance animation (default: true)
- `onClick?: () => void` - Click handler
- All Framer Motion MotionProps supported

### AnimatedButton

Spring-physics animated button with multiple variants.

```typescript
<AnimatedButton
  variant="primary"
  size="md"
  disabled={false}
  onClick={handleClick}
>
  Click me
</AnimatedButton>
```

**Props:**
- `variant?: 'primary' | 'secondary' | 'outline' | 'ghost'` - Style variant
- `size?: 'sm' | 'md' | 'lg'` - Size variant
- `disabled?: boolean` - Disabled state
- `type?: 'button' | 'submit' | 'reset'` - HTML type
- `className?: string` - Additional classes
- `onClick?: () => void` - Click handler

**Variants:**
- `primary` - Blue gradient, shadow on hover
- `secondary` - Slate background with hover
- `outline` - Border with blue text
- `ghost` - Transparent with text only

### StatCard

Display metric with icon, value, and trend.

```typescript
<StatCard
  label="Revenue"
  value="$12,345"
  icon={<TrendingUp />}
  change="+25%"
  trend="up"
  className="custom-class"
/>
```

**Props:**
- `label: string` - Metric label
- `value: string | number` - Metric value
- `icon?: ReactNode` - Icon component
- `change?: string` - Change text (e.g., "+25%")
- `trend?: 'up' | 'down' | 'neutral'` - Trend direction
- `className?: string` - Additional classes

### AnimatedCard

Flexible card with multiple style variants.

```typescript
<AnimatedCard
  variant="glass"
  hover={true}
  animated={true}
  className="p-6"
>
  Content
</AnimatedCard>
```

**Props:**
- `variant?: 'glass' | 'solid' | 'outline'` - Style variant
- `hover?: boolean` - Enable hover effects
- `animated?: boolean` - Enable entrance animation
- `className?: string` - Additional classes
- All Framer Motion MotionProps supported

**Variants:**
- `glass` - Glassmorphism with blur and transparency
- `solid` - White/dark background with border
- `outline` - Border only, no background

### NotificationBadge

Animated notification count badge.

```typescript
<button className="relative">
  <Bell className="w-6 h-6" />
  <NotificationBadge count={5} />
</button>
```

**Props:**
- `count: number` - Notification count (0 hides badge)
- `className?: string` - Additional classes

### LoadingSpinner

Animated rotating spinner for loading states.

```typescript
<LoadingSpinner size="md" variant="primary" />
```

**Props:**
- `size?: 'sm' | 'md' | 'lg'` - Spinner size
- `variant?: 'primary' | 'ghost'` - Color variant

## Color System

### Utility Function

```typescript
import { COLORS } from '@/lib/design-system'

// Using colors
const bgColor = COLORS.primary[600] // #2563eb
const textColor = COLORS.neutral[900] // #212121
```

### Primary Palette (Blue-Indigo)
```
50:   #eff6ff
100:  #dbeafe
200:  #bfdbfe
300:  #93c5fd
400:  #60a5fa
500:  #3b82f6
600:  #2563eb (primary brand)
700:  #1d4ed8
800:  #1e40af
900:  #1e3a8a
```

### Accent Palette (Pink-Rose)
```
50:   #fdf2f8
100:  #fce7f3
200:  #fbcfe8
300:  #f8b4d7
400:  #f472b6
500:  #ec4899 (accent)
600:  #db2777
700:  #be185d
800:  #9d174d
900:  #831843
```

### Semantic Colors
```
success: #10b981
warning: #f59e0b
error:   #ef4444
info:    #06b6d4
```

## Spacing System

```typescript
import { SPACING } from '@/lib/design-system'

// Available sizes
xs:   '0.25rem'  // 4px
sm:   '0.5rem'   // 8px
md:   '1rem'     // 16px
lg:   '1.5rem'   // 24px
xl:   '2rem'     // 32px
2xl:  '2.5rem'   // 40px
3xl:  '3rem'     // 48px
4xl:  '4rem'     // 64px
5xl:  '5rem'     // 80px
```

## Typography

```typescript
import { TYPOGRAPHY } from '@/lib/design-system'

// Font sizes
TYPOGRAPHY.xs      // '0.75rem'
TYPOGRAPHY.sm      // '0.875rem'
TYPOGRAPHY.base    // '1rem'
TYPOGRAPHY.lg      // '1.125rem'
TYPOGRAPHY.xl      // '1.25rem'
TYPOGRAPHY['2xl']  // '1.5rem'
TYPOGRAPHY['3xl']  // '1.875rem'
TYPOGRAPHY['4xl']  // '2.25rem'

// Font weights
TYPOGRAPHY.weights.light      // 300
TYPOGRAPHY.weights.normal     // 400
TYPOGRAPHY.weights.medium     // 500
TYPOGRAPHY.weights.semibold   // 600
TYPOGRAPHY.weights.bold       // 700
TYPOGRAPHY.weights.extrabold  // 800

// Line heights
TYPOGRAPHY.lineHeights.tight     // 1.2
TYPOGRAPHY.lineHeights.normal    // 1.5
TYPOGRAPHY.lineHeights.relaxed   // 1.625
TYPOGRAPHY.lineHeights.loose     // 1.75
```

## Shadows

```typescript
import { SHADOWS } from '@/lib/design-system'

SHADOWS.sm     // Small shadow
SHADOWS.md     // Medium shadow
SHADOWS.lg     // Large shadow
SHADOWS.xl     // Extra large shadow
SHADOWS.glass  // Glass morphism shadow

// In Tailwind
<div className="shadow-md">Content</div>
```

## Advanced Patterns

### Staggered List Animation

```typescript
<motion.ul
  variants={containerVariants}
  initial="hidden"
  animate="visible"
>
  {items.map((item) => (
    <motion.li key={item.id} variants={itemVariants}>
      {item.text}
    </motion.li>
  ))}
</motion.ul>
```

### Scroll-Triggered Animation

```typescript
<motion.section
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: true }}
>
  Content appears when scrolled into view
</motion.section>
```

### Hover with Child Animation

```typescript
<motion.div
  className="group"
  whileHover="hover"
  initial="rest"
  animate="rest"
>
  <motion.div variants={{ rest: { x: 0 }, hover: { x: 10 } }}>
    Slides on parent hover
  </motion.div>
</motion.div>
```

### Tap Feedback

```typescript
<motion.button
  whileTap={{ scale: 0.95 }}
  onClick={handleClick}
>
  Press me
</motion.button>
```

## Best Practices

1. **Use variants instead of inline animations** - Cleaner and reusable
2. **Apply animations consistently** - Same entrance style across pages
3. **Reduce motion for accessibility** - Framer Motion handles this automatically
4. **Use glass effects sparingly** - Only on key interactive elements
5. **Group related animations** - Use containerVariants for cohesion
6. **Test performance** - Monitor frame rate with DevTools
7. **Prefer Tailwind for static styles** - Use Framer Motion for dynamics only

## Examples

### Complete Page Layout

```typescript
import { motion } from 'framer-motion'
import { containerVariants, itemVariants } from '@/lib/design-system'
import { GlassCard, AnimatedButton } from '@/components/ui'

export default function Page() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 p-6"
    >
      <motion.h1 variants={itemVariants} className="text-4xl font-bold">
        Title
      </motion.h1>

      {/* Content Grid */}
      <motion.div
        className="grid grid-cols-3 gap-4"
        variants={containerVariants}
      >
        {items.map((item) => (
          <motion.div key={item.id} variants={itemVariants}>
            <GlassCard>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <AnimatedButton>Action</AnimatedButton>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}
```

---

For more information, see `ADVANCED_UI_REDESIGN.md` and check `lib/design-system.ts` for the complete system definition.
