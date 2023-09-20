export class NewFileViewModel {
  file: File;
}

export class NewFilesViewModel {
  files: Array<File>;
}

export class UploadResponseViewModel {
  data: any;
  progressDone: number;
  isCompleted: boolean;
  hasError: boolean;
}
