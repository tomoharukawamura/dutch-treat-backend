import {
  registerDecorator,
  ValidationArguments 
} from "class-validator";

export const IsNumberArray = () => {
  return (object: Object, propertyName: string) => {
    registerDecorator({
      name: 'isNumberArray',
      target: object.constructor,
      propertyName: propertyName,
      validator: {
        validate(value: any[], _args: ValidationArguments){
          return value.every(v => typeof v === 'number')
        },
      },
    })
  } 
}