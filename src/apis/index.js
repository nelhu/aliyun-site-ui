import {GET, POST} from '@/services/utils';

export default {
  getTime: GET('/time'),
  upload: POST('/upload')
};
