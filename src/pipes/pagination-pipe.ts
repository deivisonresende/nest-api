import { PipeTransform } from "@nestjs/common";

export class PaginationPipe implements PipeTransform {
  transform(value: any) {
    const DEFAULT = {
      page: '1',
      limit: '10',
      offset: 1,
      parseIntBase: 10,
      minPage: 1,
      minLimit: 0
    }

    const page = Math.max(
      DEFAULT.minPage,
      parseInt(value?.page ?? DEFAULT.page, DEFAULT.parseIntBase)
    )

    const take = Math.max(
      DEFAULT.minLimit,
      parseInt(value?.limit ?? DEFAULT.limit, DEFAULT.parseIntBase)
    )

    const skip = (page - DEFAULT.offset) * take

    return {
      take,
      skip
    }
  }
}
