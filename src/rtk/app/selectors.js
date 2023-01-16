import { createSelector } from 'reselect'

const makeUp = state => state.makeup.make_up
const foundation = state => state.makeup.foundation
const lipstick = state => state.makeup.lipstick
const mascara = state => state.makeup.mascara
const nailPolish = state => state.makeup.nailPolish
const blush = state => state.makeup.blush
const bronzer = state => state.makeup.bronzer
const eyeshadow = state => state.makeup.eyeshadow
const eyeliner = state => state.makeup.eyeliner

const annabelle = state =>state.makeup.annabelle;
const covergirl = state =>state.makeup.covergirl;
const wet_n_wild = state =>state.makeup.wet_n_wild;
const loreal = state =>state.makeup.loreal;
const nyx = state =>state.makeup.nyx;
const maybelline = state =>state.makeup.maybelline;
const glossier = state =>state.makeup.glossier;
const revlon = state =>state.makeup.revlon;


const face = state => state.makeup.face
const eyes = state => state.makeup.eyes
const bestseller = state=>state.makeup.bestseller;


const loading = state => state.makeup.loading
const error = state=> state.makeup.error


//Selector for errors and loading
export const loadingSelector = createSelector(loading, loading=>loading)
export const errorSelector = createSelector(error,error=>error)

//Selector for each product type
export const makeUpSelector = createSelector(makeUp, make_up => make_up)
export const foundationSelector = createSelector(foundation, foundation => foundation)
export const lipstickSelector = createSelector(lipstick, lipstick => lipstick)
export const mascaraSelector = createSelector(mascara, mascara => mascara)
export const nailPolishSelector = createSelector(nailPolish, nailPolish => nailPolish)
export const blushSelector = createSelector(blush, blush => blush)
export const bronzerSelector = createSelector(bronzer, bronzer => bronzer)
export const eyeshadowSelector = createSelector(eyeshadow, eyeshadow => eyeshadow)
export const eyelinerSelector = createSelector(eyeliner, eyeliner => eyeliner)


//Selector acording to Areas of Usage
export const FaceSelector = createSelector(face, face=>face);
  
export const EyesSelector = createSelector(eyes,eyes=>eyes)

export const BestSellerSelector = createSelector(bestseller,bestseller=>bestseller)

//Selector according to brands
 export const glossierSelector = createSelector(glossier,glossier=>glossier);

export const covergirlSelector = createSelector(covergirl,covergirl=>covergirl);

export const wet_n_wildSelector = createSelector(wet_n_wild,wet_n_wild=>wet_n_wild);

export const annabelleSelector = createSelector(annabelle,annabelle=>annabelle);

export const maybellineSelector = createSelector(maybelline,maybelline=>maybelline);

export const lorealSelector = createSelector(loreal,loreal=>loreal);

export const nyxSelector = createSelector(nyx,nyx=>nyx);

export const revlonSelector = createSelector(revlon,revlon=>revlon);

