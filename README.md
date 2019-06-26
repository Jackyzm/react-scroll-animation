# React Scroll Animation

React component to animate elements on scroll with [animate.css](https://daneden.github.io/animate.css/).

## Install:

```
npm install react-scroll-animation --save
```

## Most Simple Use:

```
import ScrollAnimation from 'react-scroll-animation';
<ScrollAnimation animateIn="fadeIn">
  // ...
</ScrollAnimation>
```

## Properties:

**offset** - default 100

The "viewport" is by default 150 pixels from the bottom of the screen. When part of an element is within the "viewport", animateIn is triggered. This size of the "viewport" can be overridden by setting the offset property.

**animateIn** - default slideInUp

Any css animation defined against a class, be it from [animate.css](https://daneden.github.io/animate.css/). The Animation triggers when the element enters the "viewport" (see offset property for more details on this).

**animateOut**

Any css animation defined against a class, be it from [animate.css](https://daneden.github.io/animate.css/). The Animation triggers when the element is leaving the "viewport" (see offset property for more details on this).

**time** - default 1

Animation duration in seconds.

**animateOnce** - default false

Whether the element should only animate once or not.

**style** - default {}

A style object can be assigned to any ScrollAnimation component and will be passed to the rendered dom element. Its probably best to avoid manually setting animationDuration or opacity as the component will modify those attributes.

**scrollParent**

By default the code checks to see if the element is visible within the window. This can be changed to any other parent element of the ScrollAnimation by adding a element pointing to the parent that you wish to use.

for example:

```
import ScrollAnimation from 'react-scroll-animation';
<ScrollAnimation
  animateIn="fadeIn"
  scrollParent={document.getElementByClassNames['xxx'][0]}
>
  // ...
</ScrollAnimationanimateIn="fadeIn">
```

## Development:

### Build the component:

```
npm run dist / yarn dist
```

### Run the Demo project:

```
git clone https://github.com/Jackyzm/react-scroll-animation.git
cd react-scroll-animation
npm install
npm start
```
