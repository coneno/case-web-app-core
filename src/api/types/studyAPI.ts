import { SurveyResponse, Survey, SurveyContext, LocalizedString } from "survey-engine/data_types";


export interface SurveyReferenceReq {
  studyKey: string;
  surveyKey: string;
  profileId: string;
}

export interface SurveyResponseReq {
  studyKey: string;
  response: SurveyResponse;
  profileId?: string;
  // For temp participants:
  instanceId?: string;
  temporaryParticipantId?: string;
  temporaryParticipantTimestamp?: number;
}

export interface SurveyAndContextMsg {
  survey: Survey;
  context?: SurveyContext;
  prefill?: SurveyResponse;
}

export interface AssignedSurvey {
  studyKey: string;
  surveyKey: string;
  validFrom?: number;
  validUntil?: number;
  category: string;
  profileId: string;
}

export interface AssignedSurveys {
  surveys: AssignedSurvey[];
  surveyInfos: SurveyInfo[];
}

export interface Report {
  studyKey: string;
  profileId: string;
  id: string;
  key: string;
  participantId: string;
  responseId: string;
  timestamp: number;
  data: Array<{
    key: string;
    value: string;
    dtype?: string;
  }>;
}

export interface ReportHistory {
  reports: Report[]
}

export interface StudyInfos {
  key: string;
  status: string;
  props: {
    name: LocalizedString[];
    description: LocalizedString[];
    tags?: Array<{ label: LocalizedString[] }>;
    startDate?: number;
    endDate?: number;
    systemDefaultStudy?: boolean;
  };
  stats: {
    participantCount: number;
    responseCount: number;
  }
}

export interface StudyInfoForUser extends StudyInfos {
  profileIds: string[];
}


export interface Studies {
  studies: StudyInfos[];
}

export interface StudiesForUser {
  studies: StudyInfoForUser[];
}

export interface SurveyInfo {
  studyKey: string;
  surveyKey: string;
  name: LocalizedString[];
  description: LocalizedString[];
  typicalDuration: LocalizedString[];
}

export interface SurveyInfos {
  infos: SurveyInfo[];
}

export interface ConvertTempParticipantReq {
  studyKey: string;
  temporaryParticipantId: string;
  timestamp: number;
  profileId: string;
}
