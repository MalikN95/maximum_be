import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint()
class IsImageFileConstraint implements ValidatorConstraintInterface {
  validate(value: string): boolean | Promise<boolean> {
    const acceptMimeTypes = ['image/png', 'image/jpeg'];
    const fileType = acceptMimeTypes.find((type) => type === value);

    return !fileType;
  }

  defaultMessage?(validationArguments?: ValidationArguments): string {
    return `Invalid ${validationArguments.value}`;
  }
}

export function IsImageFile(options?: ValidationOptions) {
  return (object: object, propertyName: string): void => {
    registerDecorator({
      name: 'isImageFile',
      target: object.constructor,
      propertyName,
      options,
      validator: IsImageFileConstraint,
    });
  };
}
