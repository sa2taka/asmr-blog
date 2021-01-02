import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/firestore';
import {
  Actor,
  Circle,
  FullProduct,
  FullReview,
  Product,
  Review,
  Tag,
} from '~/types/entry';

const config = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  databaseURL: process.env.databaseURL,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId,
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

type QuerySnapshot<T> = Promise<firebase.firestore.QuerySnapshot<T>>;
type DocSnapshot<T> = Promise<firebase.firestore.DocumentSnapshot<T>>;

export function fetchReviews() {
  return firebase.firestore().collection('reviews').get() as QuerySnapshot<
    Review
  >;
}

export function fetchTags() {
  return firebase.firestore().collection('tags').get() as QuerySnapshot<Tag>;
}

export function fetchActors() {
  return firebase.firestore().collection('actors').get() as QuerySnapshot<
    Actor
  >;
}

export function fetchCircles() {
  return firebase.firestore().collection('circles').get() as QuerySnapshot<
    Circle
  >;
}

export function fetchReview(id: string) {
  return firebase
    .firestore()
    .collection('reviews')
    .doc(id)
    .get() as DocSnapshot<Review>;
}

export function fetchReviewBySlug(slug: string) {
  return firebase
    .firestore()
    .collection('reviews')
    .where('slug', '==', slug)
    .limit(1)
    .get()
    .then((d) => d.docs[0]) as DocSnapshot<Review>;
}

export function fetchProduct(id: string) {
  return firebase
    .firestore()
    .collection('products')
    .doc(id)
    .get() as DocSnapshot<Product>;
}

export function fetchTag(id: string) {
  return firebase.firestore().collection('tags').doc(id).get() as DocSnapshot<
    Tag
  >;
}

export function fetchTagBySlug(slug: string) {
  return firebase
    .firestore()
    .collection('tags')
    .where('slug', '==', slug)
    .limit(1)
    .get()
    .then((d) => d.docs[0]) as DocSnapshot<Review>;
}

export function fetchTagsIn(ids: string[]) {
  return firebase
    .firestore()
    .collection('tags')
    .where(firebase.firestore.FieldPath.documentId(), 'in', ids)
    .get() as QuerySnapshot<Tag>;
}

export function fetchActor(id: string) {
  return firebase.firestore().collection('actors').doc(id).get() as DocSnapshot<
    Actor
  >;
}

export function fetchActorBySlug(slug: string) {
  return firebase
    .firestore()
    .collection('actors')
    .where('slug', '==', slug)
    .limit(1)
    .get()
    .then((d) => d.docs[0]) as DocSnapshot<Actor>;
}

export function fetchActorsIn(ids: string[]) {
  return firebase
    .firestore()
    .collection('actors')
    .where(firebase.firestore.FieldPath.documentId(), 'in', ids)
    .get() as QuerySnapshot<Actor>;
}

export function fetchCircle(id: string) {
  return firebase
    .firestore()
    .collection('circles')
    .doc(id)
    .get() as DocSnapshot<Circle>;
}

export function fetchCircleBySlug(slug: string) {
  return firebase
    .firestore()
    .collection('circles')
    .where('slug', '==', slug)
    .limit(1)
    .get()
    .then((d) => d.docs[0]) as DocSnapshot<Circle>;
}

export function fetchActorsReview(actorId: string) {
  const actorRef = firebase.firestore().collection('actors').doc(actorId);
  return firebase
    .firestore()
    .collection('reviews')
    .where('actors', 'array-contains', actorRef)
    .get() as QuerySnapshot<Review>;
}

export function fetchReviewContainsTag(tagId: string) {
  const tagRef = firebase.firestore().collection('tags').doc(tagId);
  return firebase
    .firestore()
    .collection('reviews')
    .where('tags', 'array-contains', tagRef)
    .get() as QuerySnapshot<Review>;
}

export function fetchCirclesReview(circleId: string) {
  const circleRef = firebase.firestore().collection('circles').doc(circleId);
  return firebase
    .firestore()
    .collection('reviews')
    .where('circle', '==', circleRef)
    .get() as QuerySnapshot<Review>;
}

export function fetchFullReviews() {
  return fetchReviews().then((result) => {
    return Promise.all(result.docs.map((d) => assembleFullReview(d.data())));
  });
}

export function fetchFullReview(id: string) {
  return fetchReview(id).then((result) => {
    return assembleFullReview(result.data()!);
  });
}

export function fetchFullReviewBySlug(slug: string) {
  return fetchReviewBySlug(slug).then((result) => {
    return assembleFullReview(result.data()!);
  });
}

export function assembleFullReview(review: Review) {
  const productRef = review.product;
  return fetchProduct(productRef.id)
    .then((result) => {
      const data = result.data();
      if (data) {
        const circle = fetchCircle(data.circle.id);
        const tags = fetchTagsIn(data.tags.map((d) => d.id));
        const actors = fetchActorsIn(data.actors.map((d) => d.id));
        return Promise.all([Promise.resolve(data), circle, tags, actors]);
      }
      return Promise.reject(new Error('review is not found'));
    })
    .then((results) => {
      const [rawProduct, circle, tags, actors] = results;
      const product: FullProduct = {
        name: rawProduct.name,
        slug: rawProduct.slug,
        img: rawProduct.img,
        circle: circle.data()!,
        tags: tags.docs.map((d) => d.data()),
        // @ts-ignore why
        actors: actors.docs.map((d) => d.data()),
      };

      return {
        title: review.title,
        description: review.description,
        body: review.body,
        author: review.author,
        slug: review.slug,
        public: review.public,
        soundScore: review.soundScore,
        actorScore: review.actorScore,
        costPerformanceScore: review.costPerformanceScore,
        mainScore: review.mainScore,
        product,
        createdAt: review.createdAt,
        updatedAt: review.updatedAt,
      } as FullReview;
    });
}

export default firebase;
