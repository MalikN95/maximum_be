import { capitalize } from '@common/utils/main';

type ModuleName = 'discipline' | 'club';
type ResponseMessageType = 'created' | 'deleted' | 'updated';

export function getResponseMessage(
  name: ModuleName,
  type: ResponseMessageType
): string {
  return `${capitalize(name)} has ${type} succesfully`;
}

export function getResponseMessageForNotExistingId(
  name: ModuleName,
  id: number
): string {
  return `${capitalize(name)} with ID ${id} not found`;
}
