export  class designerApi{
    private readonly Tasks_URL: string = '/api/designer/tasks';//get all task
    private readonly USER_INFO_URL: string = '/api/designer/userinfo/{0}'; // get user info
    private readonly DESIGNER_HIS_URL: string = '/api/designer/designerhis/{0}'// get designer his;
    private readonly NOTES_URL: string = '/api/designer/notes/{0}'; // get notes
    private readonly BID_URL: string = '/api/designer/{0}/bid'; // post bid
    private readonly NOTE_WR_URL: string = '/api/designer/{0}/tasks'; // post note
    private readonly DEL_BID_URL: string = '/api/designer/tasks/{0}'; //delete bid
    private readonly UPLOAD_BID_URL: string = '/api/designer/{0}/upload/'; // upload file attached to bid
}