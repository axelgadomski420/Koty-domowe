const mongoose = require("mongoose");

const catSchema = new mongoose.Schema(
  {
    // === PODSTAWOWE ===
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150
    },
    
    description: {
      type: String,
      required: true,
      maxlength: 5000
    },

    // === DANE RASY I RODOWODU ===
    breed: {
      type: String,
      required: true,
      index: true
    },
    
    lineage: {
      type: String, // nazwa linii / przydomek hodowli
      default: ""
    },
    
    pedigreeNumber: {
      type: String,
      trim: true,
      default: ""
    },
    
    registryClub: {
      type: String,
      enum: ["FIFe", "WCF", "TICA", "CFA", "Other", ""],
      default: ""
    },

    // === PRZEZNACZENIE ===
    purpose: {
      type: String,
      enum: ["PET", "BREEDING", "SHOW"],
      default: "PET",
      required: true,
      index: true
    },

    // === DANE FIZYCZNE ===
    sex: {
      type: String,
      enum: ["MALE", "FEMALE"],
      required: true
    },
    
    birthDate: {
      type: Date,
      required: true
    },
    
    color: {
      type: String,
      default: ""
    },
    
    weight: {
      type: Number, // w kg
      default: null
    },
    
    isNeutered: {
      type: Boolean,
      default: false
    },

    // === ZDROWIE ===
    healthStatus: {
      type: String,
      default: "" // np. "Zaszczepiony, odrobaczony, książeczka zdrowia"
    },
    
    vaccinations: {
      type: [String],
      default: [] // np. ["Rabies", "FVRCP"]
    },
    
    healthTests: {
      type: [String],
      default: [] // np. ["FIV/FeLV negative", "HCM clear"]
    },
    
    veterinaryCertificateUrl: {
      type: String,
      default: ""
    },

    // === LOKALIZACJA ===
    country: {
      type: String,
      required: true,
      index: true
    },
    
    city: {
      type: String,
      required: true,
      index: true
    },
    
    zipCode: {
      type: String,
      default: ""
    },

    // === CENA ===
    price: {
      type: Number,
      required: true,
      min: 0,
      index: true
    },
    
    currency: {
      type: String,
      default: "PLN",
      enum: ["PLN", "EUR", "USD", "GBP"]
    },
    
    priceNegotiable: {
      type: Boolean,
      default: false
    },

    // === MEDIA ===
    photos: {
      type: [String],
      default: [],
      validate: [arrayLimit, "Maximum 10 photos"]
    },
    
    videos: {
      type: [String],
      default: [],
      validate: [arrayLimit, "Maximum 3 videos"]
    },
    
    coverPhotoIndex: {
      type: Number,
      default: 0 // indeks w photos[], które jest cover
    },

    // === WŁAŚCICIEL (HODOWCA) ===
    breederId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },

    // === STATUS OGŁOSZENIA ===
    status: {
      type: String,
      enum: ["DRAFT", "PUBLISHED", "RESERVED", "SOLD", "ARCHIVED"],
      default: "DRAFT",
      index: true
    },
    
    publishedAt: {
      type: Date,
      default: null
    },
    
    soldAt: {
      type: Date,
      default: null
    },

    // === CECHY CHARAKTERU (opcjonalne, przydatne do AI matching) ===
    temperament: {
      type: [String],
      default: [] // np. ["friendly", "playful", "calm", "energetic"]
    },
    
    goodWithChildren: {
      type: Boolean,
      default: null
    },
    
    goodWithPets: {
      type: Boolean,
      default: null
    },

    // === AI I ANALYTICS ===
    aiDescriptionGenerated: {
      type: Boolean,
      default: false
    },
    
    viewsCount: {
      type: Number,
      default: 0,
      index: true
    },
    
    favoritesCount: {
      type: Number,
      default: 0
    },
    
    inquiriesCount: {
      type: Number,
      default: 0
    },

    // === MONETYZACJA ===
    isFeatured: {
      type: Boolean,
      default: false,
      index: true
    },
    
    featuredUntil: {
      type: Date,
      default: null
    },
    
    boostCount: {
      type: Number,
      default: 0
    },

    // === DODATKOWE INFO ===
    specialNeeds: {
      type: String,
      default: "" // np. "Wymaga specjalnej diety"
    },
    
    availableFrom: {
      type: Date,
      default: null // kiedy kot jest dostępny do odbioru
    },
    
    shippingAvailable: {
      type: Boolean,
      default: false
    },
    
    // === METADATA ===
    moderationStatus: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED", "FLAGGED"],
      default: "PENDING"
    },
    
    moderationNotes: {
      type: String,
      default: ""
    }
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// === WALIDACJA ===
function arrayLimit(val) {
  return val.length <= 10;
}

// === VIRTUAL FIELDS ===
catSchema.virtual("ageWeeks").get(function() {
  if (!this.birthDate) return null;
  const diffMs = Date.now() - this.birthDate.getTime();
  return Math.floor(diffMs / (1000 * 60 * 60 * 24 * 7));
});

catSchema.virtual("ageMonths").get(function() {
  if (!this.birthDate) return null;
  const diffMs = Date.now() - this.birthDate.getTime();
  return Math.floor(diffMs / (1000 * 60 * 60 * 24 * 30));
});

catSchema.virtual("isAvailable").get(function() {
  return this.status === "PUBLISHED" && !this.soldAt;
});

// === INDEXES dla performance ===
catSchema.index({ breed: 1, country: 1, status: 1 });
catSchema.index({ price: 1, currency: 1 });
catSchema.index({ createdAt: -1 });
catSchema.index({ viewsCount: -1 });
catSchema.index({ isFeatured: -1, featuredUntil: -1 });

// === METODY ===
catSchema.methods.incrementViews = function() {
  this.viewsCount += 1;
  return this.save();
};

catSchema.methods.markAsSold = function() {
  this.status = "SOLD";
  this.soldAt = new Date();
  return this.save();
};

catSchema.methods.markAsReserved = function() {
  this.status = "RESERVED";
  return this.save();
};

catSchema.methods.publish = function() {
  this.status = "PUBLISHED";
  this.publishedAt = new Date();
  return this.save();
};

// === PRE-SAVE HOOKS ===
catSchema.pre("save", function(next) {
  // Auto-publish date
  if (this.isModified("status") && this.status === "PUBLISHED" && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  
  // Check featured expiry
  if (this.featuredUntil && this.featuredUntil < new Date()) {
    this.isFeatured = false;
  }
  
  next();
});

module.exports = mongoose.model("Cat", catSchema);
