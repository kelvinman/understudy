# Storyboard

The frames of something being made, such as a product video, a motion piece or a flow, seen all at once and played through. It shares the run of show's timeline strip and screens; use a run of show for something performed live, a storyboard for something made.

- Strip: a `us-timeline` above the board, one segment per frame, `style="--us-span:3"` for its seconds, a short name with the full one in `title`.
- Board: `<div class="us-board">` of `<article class="us-frame" id="…">`, numbered on their own. Each frame has a `us-frame-head` (`us-frame-title`, `us-frame-time` such as "0:03 to 0:06"), then the picture, then `us-frame-shot` for the camera, `us-frame-caption` for the voiceover or caption (in the serif; leave it empty for none), and `us-frame-transition` ("Cut", "Dissolve", "Fade").
- Pictures are all 16:9, whatever kind they are; a screen in a frame takes 16:9 and clips what does not fit: a `us-screen` (`is-page`, `is-slide`, a terminal or an editor), a `us-frame-sketch` with the shot in words or an `img`, or a `us-frame-sketch is-device` around a `us-phone`, cropped at the bottom like a shot over the shoulder.
- Animatic: `us-animatic` (hidden until played) with a `us-animatic-stage` for a copy of the frame's picture, a `us-animatic-caption`, and a `us-animatic-bar` of icon buttons, a `us-timeline` and the time. The page's script holds each frame for its seconds.
