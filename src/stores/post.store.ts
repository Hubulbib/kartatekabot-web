import { makeAutoObservable } from "mobx";
import type { Post } from "../entities/types";
import { PostService } from "../services/post.service";

/**
 * Хранилище постов: список, выбранный пост и индикатор загрузки.
 */
export class PostStore {
  constructor() {
    makeAutoObservable(this, {}, { deep: true });
  }

  postList: Post[] = [];
  post: Post | null = null;
  isPostLoading: boolean = false;

  setPostList = (postList: Post[]) => {
    this.postList = postList;
  };

  setPost = (post: Post) => {
    this.post = post;
  };

  setIsPostLoading = (loading: boolean) => {
    this.isPostLoading = loading;
  };

  /** Загружает список постов выбранного заведения. */
  getPostList = async (cafeId: number) => {
    this.setIsPostLoading(true);
    try {
      const { data } = await PostService.getPostList(cafeId);
      this.setPostList(data.data);
    } catch (err) {
      throw err;
    } finally {
      this.setIsPostLoading(false);
    }
  };

  /** Загружает один пост по id для детальной страницы. */
  getPost = async (cafeId: number, postId: number) => {
    this.setIsPostLoading(true);
    try {
      const post = (await PostService.getPost(cafeId, postId)).data.data;
      this.setPost(post);
    } catch (err) {
      throw err;
    } finally {
      this.setIsPostLoading(false);
    }
  };

  /** Создает пост и добавляет его в начало списка postList. */
  createPost = async (
    cafeId: number,
    body: Omit<Post, "id" | "createdAt" | "updatedAt" | "cafeId" | "media">,
    files: File[]
  ) => {
    this.setIsPostLoading(true);
    try {
      const post = (await PostService.createPost(cafeId, body, files)).data
        .data;
      this.setPostList([post, ...this.postList]);
    } catch (err) {
      throw err;
    } finally {
      this.setIsPostLoading(false);
    }
  };

  /** Обновляет пост и синхронизирует объект post в store. */
  editPost = async (
    cafeId: number,
    postId: number,
    body: Omit<Post, "id" | "createdAt" | "updatedAt" | "cafeId" | "media">,
    files: File[]
  ) => {
    this.setIsPostLoading(true);
    try {
      const post = (await PostService.editPost(cafeId, postId, body, files))
        .data.data;
      this.setPost(post);
    } catch (err) {
      throw err;
    } finally {
      this.setIsPostLoading(false);
    }
  };

  /** Удаляет пост и пересобирает локальный список без удаленного элемента. */
  deletePost = async (cafeId: number, postId: number) => {
    this.setIsPostLoading(true);
    try {
      await PostService.deletePost(cafeId, postId);
      this.setPostList(this.postList.filter((el) => el.id !== postId));
    } catch (err) {
      throw err;
    } finally {
      this.setIsPostLoading(false);
    }
  };
}
