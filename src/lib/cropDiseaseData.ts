export interface CropDiseaseInfo {
  plantName: string;
  diseaseName: string;
  isHealthy: boolean;
  severity: 'Low' | 'Medium' | 'High';
  recommendations: string[];
  preventiveMeasures: string[];
}

export const CROP_DISEASE_DATA: Record<string, CropDiseaseInfo> = {
  'Apple___Apple_scab': {
    plantName: 'Apple',
    diseaseName: 'Apple Scab',
    isHealthy: false,
    severity: 'Medium',
    recommendations: [
      'Apply fungicides containing captan or myclobutanil at bud break.',
      'Remove and destroy infected leaves and fruit to reduce spore load.',
      'Prune trees to improve air circulation and reduce humidity.',
      'Avoid overhead irrigation; water at the base of the tree.',
    ],
    preventiveMeasures: [
      'Plant scab-resistant apple varieties where possible.',
      'Rake and dispose of fallen leaves in autumn to prevent overwintering spores.',
      'Apply protectant fungicides before rainy periods in spring.',
    ],
  },
  'Apple___Black_rot': {
    plantName: 'Apple',
    diseaseName: 'Black Rot',
    isHealthy: false,
    severity: 'High',
    recommendations: [
      'Remove mummified fruits and dead wood from the tree immediately.',
      'Apply copper-based fungicides during dormancy and at early season.',
      'Prune out cankers at least 15 cm below visible infection.',
      'Dispose of infected material far from the orchard.',
    ],
    preventiveMeasures: [
      'Maintain tree vigor with proper nutrition and irrigation.',
      'Ensure good air circulation through regular pruning.',
      'Avoid wounding trees during cultivation operations.',
    ],
  },
  'Apple___Cedar_apple_rust': {
    plantName: 'Apple',
    diseaseName: 'Cedar Apple Rust',
    isHealthy: false,
    severity: 'Medium',
    recommendations: [
      'Apply fungicides (myclobutanil or triadimefon) starting at pink bud stage.',
      'Remove nearby cedar or juniper trees that act as alternate hosts.',
      'Continue fungicide applications through petal fall and beyond.',
    ],
    preventiveMeasures: [
      'Plant rust-resistant apple cultivars.',
      'Avoid planting near eastern red cedars or ornamental junipers.',
      'Monitor for orange galls on nearby cedar trees in early spring.',
    ],
  },
  'Apple___healthy': {
    plantName: 'Apple',
    diseaseName: 'Healthy',
    isHealthy: true,
    severity: 'Low',
    recommendations: [
      'Continue current orchard management practices.',
      'Monitor regularly for early signs of pests or disease.',
      'Maintain balanced fertilization and irrigation schedules.',
    ],
    preventiveMeasures: [
      'Apply preventive fungicide sprays during high-risk weather periods.',
      'Prune annually to maintain open canopy and airflow.',
      'Keep records of spray programs for future reference.',
    ],
  },
  'Blueberry___healthy': {
    plantName: 'Blueberry',
    diseaseName: 'Healthy',
    isHealthy: true,
    severity: 'Low',
    recommendations: [
      'Maintain soil pH between 4.5–5.5 for optimal growth.',
      'Continue regular monitoring for mummy berry and other diseases.',
      'Ensure adequate irrigation and mulching.',
    ],
    preventiveMeasures: [
      'Apply preventive fungicides early in the season.',
      'Remove mummified berries from the ground after harvest.',
      'Use row covers to protect against frost and birds.',
    ],
  },
  'Cherry_(including_sour)___Powdery_mildew': {
    plantName: 'Cherry',
    diseaseName: 'Powdery Mildew',
    isHealthy: false,
    severity: 'Medium',
    recommendations: [
      'Apply sulfur-based or potassium bicarbonate fungicides at first sign.',
      'Prune affected shoots and dispose of them away from the orchard.',
      'Avoid applying excessive nitrogen fertilizer which promotes tender growth.',
    ],
    preventiveMeasures: [
      'Ensure good air circulation through proper spacing and pruning.',
      'Avoid overhead irrigation late in the day.',
      'Plant resistant cherry varieties if available.',
    ],
  },
  'Cherry_(including_sour)___healthy': {
    plantName: 'Cherry',
    diseaseName: 'Healthy',
    isHealthy: true,
    severity: 'Low',
    recommendations: [
      'Continue current orchard management.',
      'Monitor for early signs of leaf spot or powdery mildew.',
    ],
    preventiveMeasures: [
      'Apply dormant sprays to control overwintering pests.',
      'Maintain proper nutrition and irrigation.',
    ],
  },
  'Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot': {
    plantName: 'Corn (Maize)',
    diseaseName: 'Cercospora / Gray Leaf Spot',
    isHealthy: false,
    severity: 'High',
    recommendations: [
      'Apply foliar fungicides (strobilurins or triazoles) at early tasseling.',
      'Rotate crops — avoid planting maize in the same field consecutively.',
      'Till infected residue into the soil after harvest to reduce inoculum.',
    ],
    preventiveMeasures: [
      'Plant resistant hybrids with high GLS ratings.',
      'Ensure adequate plant spacing to reduce humidity.',
      'Avoid late planting which coincides with high humidity periods.',
    ],
  },
  'Corn_(maize)___Common_rust_': {
    plantName: 'Corn (Maize)',
    diseaseName: 'Common Rust',
    isHealthy: false,
    severity: 'Medium',
    recommendations: [
      'Apply foliar fungicides early when rust pustules are first observed.',
      'Scout fields regularly from silking onwards.',
      'Prioritize fungicide applications on susceptible varieties.',
    ],
    preventiveMeasures: [
      'Plant rust-resistant corn hybrids.',
      'Avoid planting susceptible varieties during rust-prone seasons.',
      'Monitor neighboring fields for early disease spread.',
    ],
  },
  'Corn_(maize)___Northern_Leaf_Blight': {
    plantName: 'Corn (Maize)',
    diseaseName: 'Northern Leaf Blight',
    isHealthy: false,
    severity: 'High',
    recommendations: [
      'Apply fungicides (propiconazole or azoxystrobin) at VT/R1 growth stage.',
      'Remove and destroy severely infected plants.',
      'Rotate with non-host crops like soybeans or wheat.',
    ],
    preventiveMeasures: [
      'Select NLB-resistant hybrids for planting.',
      'Implement crop rotation to reduce soilborne inoculum.',
      'Avoid fields with heavy residue and poor drainage.',
    ],
  },
  'Corn_(maize)___healthy': {
    plantName: 'Corn (Maize)',
    diseaseName: 'Healthy',
    isHealthy: true,
    severity: 'Low',
    recommendations: [
      'Continue scouting through the season for early disease detection.',
      'Maintain balanced nutrition and irrigation.',
    ],
    preventiveMeasures: [
      'Rotate crops annually.',
      'Select locally adapted, disease-resistant hybrids.',
    ],
  },
  'Grape___Black_rot': {
    plantName: 'Grape',
    diseaseName: 'Black Rot',
    isHealthy: false,
    severity: 'High',
    recommendations: [
      'Apply mancozeb or myclobutanil fungicides starting at bud break.',
      'Remove all mummified berries and infected canes before new growth.',
      'Ensure that vineyard canopy is well-managed for air circulation.',
    ],
    preventiveMeasures: [
      'Plant disease-resistant grape varieties.',
      'Train vines to keep fruit off the ground.',
      'Remove and bury mummies and infected wood during dormant pruning.',
    ],
  },
  'Grape___Esca_(Black_Measles)': {
    plantName: 'Grape',
    diseaseName: 'Esca (Black Measles)',
    isHealthy: false,
    severity: 'High',
    recommendations: [
      'Remove and destroy entire vines if more than 50% of canes are infected.',
      'Protect pruning wounds immediately with fungicide or wound sealant.',
      'Avoid pruning during wet weather to reduce infection risk.',
    ],
    preventiveMeasures: [
      'Use clean, sanitized pruning tools between vines.',
      'Apply wound protectants (Trichoderma-based) after pruning.',
      'Avoid large pruning wounds; use double pruning technique.',
    ],
  },
  'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)': {
    plantName: 'Grape',
    diseaseName: 'Leaf Blight (Isariopsis Leaf Spot)',
    isHealthy: false,
    severity: 'Medium',
    recommendations: [
      'Apply copper-based fungicides at early symptom appearance.',
      'Remove and destroy heavily infected leaves.',
      'Ensure good drainage and air movement in the vineyard.',
    ],
    preventiveMeasures: [
      'Avoid excessive leaf density by proper shoot positioning.',
      'Apply preventive sprays before prolonged wet periods.',
    ],
  },
  'Grape___healthy': {
    plantName: 'Grape',
    diseaseName: 'Healthy',
    isHealthy: true,
    severity: 'Low',
    recommendations: [
      'Continue regular vine monitoring throughout the season.',
      'Maintain balanced fertilization.',
    ],
    preventiveMeasures: [
      'Prune annually and train canopy for good airflow.',
      'Apply preventive fungicides during wet spring weather.',
    ],
  },
  'Orange___Haunglongbing_(Citrus_greening)': {
    plantName: 'Orange',
    diseaseName: 'Citrus Greening (HLB)',
    isHealthy: false,
    severity: 'High',
    recommendations: [
      'Remove and destroy infected trees immediately to prevent spread.',
      'Control the Asian citrus psyllid vector using systemic insecticides.',
      'There is currently no cure — infected trees should be removed.',
      'Report confirmed HLB to your local agricultural authority.',
    ],
    preventiveMeasures: [
      'Use certified disease-free planting material.',
      'Monitor and control psyllid populations regularly.',
      'Quarantine new plant material before introducing to the grove.',
    ],
  },
  'Peach___Bacterial_spot': {
    plantName: 'Peach',
    diseaseName: 'Bacterial Spot',
    isHealthy: false,
    severity: 'Medium',
    recommendations: [
      'Apply copper-based bactericides starting at green tip in early spring.',
      'Avoid overhead irrigation which splashes bacteria to new tissue.',
      'Remove and dispose of infected twigs and fruit.',
    ],
    preventiveMeasures: [
      'Plant resistant peach or nectarine cultivars.',
      'Avoid excessive nitrogen which promotes succulent, susceptible tissue.',
      'Wind-break planting reduces wind-blown spread.',
    ],
  },
  'Peach___healthy': {
    plantName: 'Peach',
    diseaseName: 'Healthy',
    isHealthy: true,
    severity: 'Low',
    recommendations: [
      'Continue current management and scouting practices.',
      'Maintain proper thinning to ensure fruit quality.',
    ],
    preventiveMeasures: [
      'Apply dormant copper sprays to reduce bacterial load.',
      'Prune for open center canopy and good air circulation.',
    ],
  },
  'Pepper,_bell___Bacterial_spot': {
    plantName: 'Bell Pepper',
    diseaseName: 'Bacterial Spot',
    isHealthy: false,
    severity: 'High',
    recommendations: [
      'Apply copper bactericides + mancozeb mixture at first symptom.',
      'Remove infected plant material and avoid working in wet fields.',
      'Rotate with non-solanaceous crops for at least 2 years.',
    ],
    preventiveMeasures: [
      'Use certified disease-free or treated seed.',
      'Avoid overhead irrigation; use drip irrigation instead.',
      'Disinfect tools between rows during field operations.',
    ],
  },
  'Pepper,_bell___healthy': {
    plantName: 'Bell Pepper',
    diseaseName: 'Healthy',
    isHealthy: true,
    severity: 'Low',
    recommendations: [
      'Keep monitoring for bacterial spot and virus symptoms.',
      'Maintain consistent soil moisture to reduce stress.',
    ],
    preventiveMeasures: [
      'Use resistant varieties and certified seed.',
      'Implement crop rotation every season.',
    ],
  },
  'Potato___Early_blight': {
    plantName: 'Potato',
    diseaseName: 'Early Blight',
    isHealthy: false,
    severity: 'Medium',
    recommendations: [
      'Apply chlorothalonil or mancozeb fungicide at first sign of lesions.',
      'Ensure proper plant nutrition — nitrogen deficiency worsens early blight.',
      'Remove heavily infected lower leaves and destroy them.',
    ],
    preventiveMeasures: [
      'Plant certified disease-free seed potatoes.',
      'Rotate crops — avoid planting potatoes or tomatoes consecutively.',
      'Maintain balanced fertilization to keep plants vigorous.',
    ],
  },
  'Potato___Late_blight': {
    plantName: 'Potato',
    diseaseName: 'Late Blight',
    isHealthy: false,
    severity: 'High',
    recommendations: [
      'Apply systemic fungicides (metalaxyl or cymoxanil) immediately.',
      'Remove and destroy all infected foliage — do not compost.',
      'Harvest tubers immediately if foliage is severely affected.',
      'Avoid overhead irrigation and improve field drainage.',
    ],
    preventiveMeasures: [
      'Plant resistant potato varieties (e.g., Sarpo Mira).',
      'Apply preventive fungicides during cool, moist weather periods.',
      'Avoid creating wounds during hilling operations.',
    ],
  },
  'Potato___healthy': {
    plantName: 'Potato',
    diseaseName: 'Healthy',
    isHealthy: true,
    severity: 'Low',
    recommendations: [
      'Continue regular scouting for blight and virus symptoms.',
      'Maintain hilling to protect tubers from greening.',
    ],
    preventiveMeasures: [
      'Use certified seed potatoes every season.',
      'Rotate crops and avoid solanaceous volunteers.',
    ],
  },
  'Raspberry___healthy': {
    plantName: 'Raspberry',
    diseaseName: 'Healthy',
    isHealthy: true,
    severity: 'Low',
    recommendations: [
      'Continue regular cane management and pruning.',
      'Monitor for cane blight and botrytis.',
    ],
    preventiveMeasures: [
      'Prune out fruited canes immediately after harvest.',
      'Apply preventive fungicides during flowering.',
    ],
  },
  'Soybean___healthy': {
    plantName: 'Soybean',
    diseaseName: 'Healthy',
    isHealthy: true,
    severity: 'Low',
    recommendations: [
      'Continue scouting for sudden death syndrome and SCN.',
      'Maintain balanced soil pH and nutrient levels.',
    ],
    preventiveMeasures: [
      'Use SCN-resistant varieties.',
      'Rotate with corn or small grains annually.',
    ],
  },
  'Squash___Powdery_mildew': {
    plantName: 'Squash',
    diseaseName: 'Powdery Mildew',
    isHealthy: false,
    severity: 'Medium',
    recommendations: [
      'Apply potassium bicarbonate, neem oil, or sulfur-based fungicide.',
      'Remove heavily infected leaves to reduce spread.',
      'Avoid wetting foliage when irrigating.',
    ],
    preventiveMeasures: [
      'Plant powdery mildew-resistant squash varieties.',
      'Ensure wide plant spacing for good airflow.',
      'Avoid excessive nitrogen fertilization.',
    ],
  },
  'Strawberry___Leaf_scorch': {
    plantName: 'Strawberry',
    diseaseName: 'Leaf Scorch',
    isHealthy: false,
    severity: 'Medium',
    recommendations: [
      'Apply captan or myclobutanil fungicide early in the season.',
      'Remove and destroy old leaves and plant debris after harvest.',
      'Renovate strawberry beds annually to reduce disease pressure.',
    ],
    preventiveMeasures: [
      'Use certified disease-free transplants.',
      'Avoid planting in shaded or poorly drained areas.',
      'Maintain proper plant spacing for airflow.',
    ],
  },
  'Strawberry___healthy': {
    plantName: 'Strawberry',
    diseaseName: 'Healthy',
    isHealthy: true,
    severity: 'Low',
    recommendations: [
      'Continue regular monitoring for leaf scorch and botrytis.',
      'Ensure mulching to keep fruit clean and reduce splash.',
    ],
    preventiveMeasures: [
      'Renovate beds after harvest each year.',
      'Apply pre-bloom fungicide sprays preventively.',
    ],
  },
  'Tomato___Bacterial_spot': {
    plantName: 'Tomato',
    diseaseName: 'Bacterial Spot',
    isHealthy: false,
    severity: 'High',
    recommendations: [
      'Apply copper + mancozeb bactericide sprays at first sign.',
      'Remove infected plant parts and avoid working in wet conditions.',
      'Rotate with non-solanaceous crops for at least 2 years.',
    ],
    preventiveMeasures: [
      'Use certified disease-free seed or treated seed.',
      'Drip-irrigate to keep foliage dry.',
      'Disinfect equipment between rows.',
    ],
  },
  'Tomato___Early_blight': {
    plantName: 'Tomato',
    diseaseName: 'Early Blight',
    isHealthy: false,
    severity: 'Medium',
    recommendations: [
      'Apply chlorothalonil or mancozeb starting at first symptom.',
      'Remove heavily infected lower leaves.',
      'Stake plants to improve airflow and reduce ground splash.',
    ],
    preventiveMeasures: [
      'Mulch around plants to prevent soil splash.',
      'Water at the base; avoid wetting foliage.',
      'Rotate crops and use resistant varieties.',
    ],
  },
  'Tomato___Late_blight': {
    plantName: 'Tomato',
    diseaseName: 'Late Blight',
    isHealthy: false,
    severity: 'High',
    recommendations: [
      'Apply metalaxyl or cymoxanil-based fungicide immediately.',
      'Remove all infected tissue and destroy — do not compost.',
      'Avoid overhead irrigation; switch to drip irrigation.',
      'Harvest any remaining fruit before the disease spreads to them.',
    ],
    preventiveMeasures: [
      'Plant resistant tomato varieties.',
      'Apply preventive sprays during cool, wet periods.',
      'Inspect plants frequently — early detection is critical.',
    ],
  },
  'Tomato___Leaf_Mold': {
    plantName: 'Tomato',
    diseaseName: 'Leaf Mold',
    isHealthy: false,
    severity: 'Medium',
    recommendations: [
      'Improve greenhouse ventilation to reduce humidity below 85%.',
      'Apply chlorothalonil or copper-based fungicide.',
      'Remove infected leaves and dispose of them outside the field.',
    ],
    preventiveMeasures: [
      'Use resistant tomato varieties in high-humidity environments.',
      'Avoid excessive leaf area — prune for good air movement.',
      'Avoid wetting foliage during irrigation.',
    ],
  },
  'Tomato___Septoria_leaf_spot': {
    plantName: 'Tomato',
    diseaseName: 'Septoria Leaf Spot',
    isHealthy: false,
    severity: 'Medium',
    recommendations: [
      'Apply mancozeb or chlorothalonil fungicides at first sign.',
      'Remove lower infected leaves and destroy them.',
      'Mulch soil to reduce splash of soilborne spores.',
    ],
    preventiveMeasures: [
      'Rotate tomatoes with non-solanaceous crops.',
      'Water at the base using drip irrigation.',
      'Stake plants to keep foliage off the ground.',
    ],
  },
  'Tomato___Spider_mites Two-spotted_spider_mite': {
    plantName: 'Tomato',
    diseaseName: 'Spider Mites (Two-Spotted)',
    isHealthy: false,
    severity: 'High',
    recommendations: [
      'Apply miticides (abamectin or bifenazate) rotating modes of action.',
      'Spray undersides of leaves thoroughly where mites congregate.',
      'Remove heavily infested leaves and dispose of them.',
      'Increase humidity around plants — mites prefer hot, dry conditions.',
    ],
    preventiveMeasures: [
      'Avoid dusty field conditions which favor mite outbreaks.',
      'Introduce predatory mites (Phytoseiidae) as biological control.',
      'Monitor the undersides of leaves regularly, especially in dry weather.',
    ],
  },
  'Tomato___Target_Spot': {
    plantName: 'Tomato',
    diseaseName: 'Target Spot',
    isHealthy: false,
    severity: 'Medium',
    recommendations: [
      'Apply azoxystrobin or chlorothalonil fungicides at first symptoms.',
      'Improve spacing and canopy management for airflow.',
      'Remove heavily infected leaves and destroy them.',
    ],
    preventiveMeasures: [
      'Avoid planting in previously infected fields.',
      'Reduce leaf wetness duration with drip irrigation.',
      'Apply preventive fungicide after transplanting.',
    ],
  },
  'Tomato___Tomato_Yellow_Leaf_Curl_Virus': {
    plantName: 'Tomato',
    diseaseName: 'Yellow Leaf Curl Virus (TYLCV)',
    isHealthy: false,
    severity: 'High',
    recommendations: [
      'Control whitefly populations with systemic insecticides (imidacloprid).',
      'Remove and destroy virus-infected plants immediately.',
      'Use reflective mulches to deter whitefly landings.',
      'There is no cure — focus on vector control and resistant varieties.',
    ],
    preventiveMeasures: [
      'Plant TYLCV-resistant tomato varieties.',
      'Use insect-proof netting in nursery stages.',
      'Avoid planting near other infected solanaceous crops.',
    ],
  },
  'Tomato___Tomato_mosaic_virus': {
    plantName: 'Tomato',
    diseaseName: 'Tomato Mosaic Virus (ToMV)',
    isHealthy: false,
    severity: 'High',
    recommendations: [
      'Remove and destroy infected plants to prevent mechanical spread.',
      'Wash hands thoroughly with soap before handling plants.',
      'Disinfect all tools with 10% bleach or 70% alcohol between uses.',
      'There is no chemical cure — roguing infected plants is essential.',
    ],
    preventiveMeasures: [
      'Use ToMV-resistant tomato varieties.',
      'Use only certified virus-free seed.',
      'Avoid smoking near plants as tobacco carries the virus.',
    ],
  },
  'Tomato___healthy': {
    plantName: 'Tomato',
    diseaseName: 'Healthy',
    isHealthy: true,
    severity: 'Low',
    recommendations: [
      'Continue regular scouting for early and late blight.',
      'Maintain consistent soil moisture and fertility.',
    ],
    preventiveMeasures: [
      'Rotate crops every season.',
      'Stake or cage plants to improve airflow.',
      'Mulch soil surface to reduce splash inoculation.',
    ],
  },
};

/**
 * Looks up disease info from a class key returned by the model.
 * Supports both exact match and partial match (for slight label variations).
 */
export function getCropDiseaseInfo(classKey: string): CropDiseaseInfo | null {
  // Direct match
  if (CROP_DISEASE_DATA[classKey]) return CROP_DISEASE_DATA[classKey];

  // The PyTorch model (`disease_model.pth`) was trained on a differently-named 15-class subset
  // Example model outputs: "Pepper__bell___Bacterial_spot", "Tomato_Bacterial_spot", "Tomato__Tomato_mosaic_virus"
  // Our new frontend keys: "Pepper,_bell___Bacterial_spot", "Tomato___Bacterial_spot", "Tomato___Tomato_mosaic_virus"
  
  // Cleanup mapping for the model's specific 15 labels to our new 38-class dictionary keys
  const modelToDatasetMap: Record<string, string> = {
    "Pepper__bell___Bacterial_spot": "Pepper,_bell___Bacterial_spot",
    "Pepper__bell___healthy": "Pepper,_bell___healthy",
    "Potato___Early_blight": "Potato___Early_blight",
    "Potato___Late_blight": "Potato___Late_blight",
    "Potato___healthy": "Potato___healthy",
    "Tomato_Bacterial_spot": "Tomato___Bacterial_spot",
    "Tomato_Early_blight": "Tomato___Early_blight",
    "Tomato_Late_blight": "Tomato___Late_blight",
    "Tomato_Leaf_Mold": "Tomato___Leaf_Mold",
    "Tomato_Septoria_leaf_spot": "Tomato___Septoria_leaf_spot",
    "Tomato_Spider_mites_Two_spotted_spider_mite": "Tomato___Spider_mites Two-spotted_spider_mite",
    "Tomato__Target_Spot": "Tomato___Target_Spot",
    "Tomato__Tomato_YellowLeaf__Curl_Virus": "Tomato___Tomato_Yellow_Leaf_Curl_Virus",
    "Tomato__Tomato_mosaic_virus": "Tomato___Tomato_mosaic_virus",
    "Tomato_healthy": "Tomato___healthy"
  };

  if (modelToDatasetMap[classKey] && CROP_DISEASE_DATA[modelToDatasetMap[classKey]]) {
    return CROP_DISEASE_DATA[modelToDatasetMap[classKey]];
  }

  // Try case-insensitive partial match as an absolute fallback
  const normalized = classKey.toLowerCase().replace(/_/g, '');
  const found = Object.entries(CROP_DISEASE_DATA).find(([key]) =>
    key.toLowerCase().replace(/_/g, '').includes(normalized) || normalized.includes(key.toLowerCase().replace(/_/g, ''))
  );
  return found ? found[1] : null;
}
