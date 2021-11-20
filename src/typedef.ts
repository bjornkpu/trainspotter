
export interface Trip {
  tripPatterns:   TripPattern[];
  messageEnums:   string[];
  messageStrings: string[];
}

export interface TripPattern {
  expectedStartTime: string;
  legs:              Leg[];
}

export interface Leg {
  mode: string;
  line: Line;
}

export interface Line {
  id:         string;
  publicCode: string;
}

export interface PugOption {
  from: string
  to: string
  normalExpectedStartTime: string
  expectedStartTime: string
  errorMsg: string
  trip: string|null
}