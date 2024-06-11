import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import luxon from 'luxon'

@Injectable()
export class DateParsePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if(metadata.data !== 'Query'){
      return value
    }
    const valueStr = value as string
    const dateTime = luxon.DateTime.fromISO(valueStr)
    if(!dateTime.isValid){
      throw new BadRequestException()
    }
    return dateTime
  }
}