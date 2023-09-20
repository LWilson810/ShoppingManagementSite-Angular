export class worker {
  static serever_url = "http://192.168.1.100:5005";
    static readonly WORKER_URL = worker.serever_url +'/api/worker'; // get all information of the bid.
    static readonly WORKER_MYWORK_URL = worker.serever_url +'/api/worker/{userid}'; // get id's work information 
    static readonly WORKER_UPLOAD_URL = worker.serever_url +'/api/upload/{userid}/{filename}'; // upload file named filename
    static readonly WORKER_DOWNLOAD_URL = worker.serever_url +'/api/download/{userid}/{filename}'; // download file named filename in who folder
    static readonly WORKER_PROPOSEWORK_URL = worker.serever_url +'/api/worker/propose/{userid}/' // the worker of id proposes the work.
    static readonly WORKER_DELETEWORK_URL = worker.serever_url +'/api/worker/delete/{userid}/{projectid}' // delete the projectid in userid
    // static readonly WORKER_CHANGE_URL = '/api/worker/change/{userid}/{projectid}' //change the projects from userid
    static readonly WORKER_GET_RECEIVEDESIGN_URL = worker.serever_url +'/api/worker/receivedesign/{projectid}' //get all designers bidded the userid 
    static readonly WORKER_GET_DESIGN_URL = worker.serever_url +'/api/worker/bidinfo/{bidderid}' //get a bidder from  the userid 

    static readonly WORKER_SEND_ACCEPTTODESIGN = worker.serever_url +'/api/worker/acceptdesign/{projectid}/{bidid}' // update the status field of bid and task
    static readonly WORKER_GET_HISTORY = worker.serever_url + '/api/worker/history/{workerid}' // get all bidded bidders
    static readonly WORKER_UPDATE_VIEW = worker.serever_url + '/api/worker/updateview/{projectid}'//update the view number
  }

export class auth {
    static readonly POST_SIGN_IN: string = '/api/auth/login';
    static readonly POST_SIGN_UP: string = '/api/auth/register';
    static readonly POST_FORGOT_PASSWORD: string = '/api/auth/forgot-password';
    static readonly POST_RESET_PASSWORD: string = '/api/auth/reset-password';
}