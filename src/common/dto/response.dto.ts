
export class ResponseDTO<T extends any> {
  readonly jsonapi: Version = new Version();
  readonly meta: Meta = new Meta();
  readonly data: T;
 
  constructor(data: any) {
     this.data = data; 
  }
}

export class Version {
  readonly version: string = '1.1';
}

export class Meta {
  readonly build: string = '20191211-072416 #CUSTOM_LOCAL_BUILD built by tch';
  readonly api: string = 'v1';
  readonly version: string = '1.0';
  totalNumberOfPages: number;
  totalNumberOfItems: number;
}

export class Data<T extends any> {
  readonly id: string;
  readonly type: string;
  readonly attributes: any;

  constructor(id: string, type: string, object: Object) {
    this.id = id;
    this.type = type;
    this.attributes = {};
  
    Object.entries(object).forEach((e) => {
      const key = e[0], value = e[1];
      if (key !== 'id' && value) {
        this.attributes[key] = value;
      }
    });

  }

}