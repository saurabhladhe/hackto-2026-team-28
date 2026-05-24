export interface Member {
  name: string;
  role: string;
  office: string;
}

export interface TeamDirectoryData {
  type: "team-directory";
  members: Member[];
}
