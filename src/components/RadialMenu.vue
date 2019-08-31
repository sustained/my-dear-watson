<template>
  <div>
    <svg :width="diameter" :height="diameter">
      <path
        v-for="(segment, index) in segments"
        fill="transparent"
        stroke="#000000"
        stroke-width="2"
        :d="segment.path"
        :transform="segment.transform" />
    </svg>
  </div>
</div>

</template>

<script>
import { degreesToRadians } from "../utilities/math";

/*
  TODO:
    - Add concept of spacing/padding.
    - Icons.
    - Figure out how to animate/transition this stuff.
    - Interactivity.
    - Accessiblility.
    - Add mode where there is an inner circle (so the segments have 2 arcs).
    - etc.
*/

export default {
  props: {
    numSegments: {
      type: Number,
      default() {
        return 6;
      }
    },

    radius: {
      type: Number,
      default() {
        return 125;
      }
    }
  },

  data() {
    return {
      _radius: this.radius,
      _numSegments: this.numSegments,
      segments: [],
    };
  },
  
  created() {
    this.segments = new Array(this.numSegments)
      .fill()
      .map((_, i) => this.computeSegmentPath(i));
  },
  
  computed: {
    diameter() {
      return this.radius * 2;
    },
    
    segmentSizeDegrees() {
      return 360 / this.numSegments;
    }
  },

  methods: {
    computeSegmentPath(i) {
      const { radius, diameter, numSegments } = this;
      
      const angle = this.segmentSizeDegrees * (i + 1);
      const arcTo = degreesToRadians(this.segmentSizeDegrees);
      
      const path = ([
        `M${radius},${radius}`,
        `l${radius},0`,
        `A${radius},${radius} 0 0,0 ${arcTo[0]},${arcTo[1]}`,
        `z`
      ]).join(" ");
      
      const transform = `rotate(${angle} ${radius} ${radius})`;
      
      return { path, transform };
    }
  }
})
</script>

<style>

</style>