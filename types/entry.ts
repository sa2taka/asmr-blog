import firebase from 'firebase';

export interface Review extends firebase.firestore.DocumentData {
  title: string;
  description: string;
  body: string;
  tags: Tag[];
  slug: string;
  public: boolean;
  releaseDate: string;
  latex: boolean;
}

export interface Product extends firebase.firestore.DocumentData {
  name: string;
  slug: string;
}

export interface Tag extends firebase.firestore.DocumentData {
  name: string;
  slug: string;
}

export interface Circle extends firebase.firestore.DocumentData {
  name: string;
  slug: string;
}

export interface Actor extends firebase.firestore.DocumentData {
  name: string;
  slug: string;
}

export interface Comment extends firebase.firestore.DocumentData {
  username: string;
  text: string;
  onlyAdministrator: string;
}
