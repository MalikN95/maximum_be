import { PageOptionsDto } from './page-options.dto';

export class PageMetaDto {
  /**
   * @default 1
   * limit of item is chosen by user
   */
  readonly take: number;

  /**
   * the total amount of items
   */
  totalItems?: number;

  /**
   * the amount of items that were requested per page
   */
  readonly itemsPerPage: number;

  /**
   * the current page this paginator "points" to
   * the number of page is chosen by User
   */
  readonly currentPage: number;

  /**
   * The total amount of pages in this paginator
   */
  readonly pageCount: number;

  readonly hasPreviousPage: boolean;

  readonly hasNextPage: boolean;

  readonly isFirstPage: boolean;

  constructor(totalItems: number, pageOptionsDto: PageOptionsDto) {
    this.totalItems = totalItems ? totalItems : undefined;
    this.currentPage = pageOptionsDto.page;
    this.take = pageOptionsDto.take;
    this.pageCount = this.totalItems
      ? Math.ceil(this.totalItems / this.take)
      : undefined;
    this.hasPreviousPage = this.currentPage > 1;
    this.hasNextPage = this.currentPage < this.pageCount;
    this.isFirstPage = this.currentPage == 1;
  }
}
