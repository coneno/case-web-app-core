import clsx from 'clsx';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { dialogActions } from '../../../store/dialogSlice';

import { PageColumn, PageItem, PageRow } from '../../../types/pagesConfig';
import {
  handleOpenExternalPage,
  ImageCard,
  LoginCard,
  SimpleCard,
  AccordionList,
  ImageContainer,
  LogoCredits,
  TeaserImage,
  TitleBar,
  VideoPlayer,
  MarkdownLoader,
  LinkList,
  MapWithTimeSliderLoader,
  ComposedLineAndScatterChartLoader,
  containerClassName,
} from 'case-web-ui';

import SystemInfo from '../../settings/SystemInfo';
import AccountSettings from '../../settings/AccountSettings';
import CommunicationSettings from '../../settings/CommunicationSettings';
import DeleteAccount from '../../settings/DeleteAccount';

import SurveyList from '../../study/SurveyList';
import { DefaultRoutes } from '../../../types/routing';
import { setPersistState } from '../../../store/appSlice';
import { RootState } from '../../../store/rootReducer';
import { getTranslatedMarkdownPath } from '../../../hooks/useTranslatedMarkdown';
import { componentBuilder } from '../../../extension/config';


interface ContentRendererProps {
  isAuthenticated: boolean;
  rows: Array<PageRow>;
  pageKey: string;
  defaultRoutes: DefaultRoutes;
}

const shouldHide = (hideWhen?: string, isAuth?: boolean): boolean => {
  if (
    (hideWhen === 'auth' && isAuth) ||
    (hideWhen === 'unauth' && !isAuth)
  ) {
    return true;
  }
  return false;
}

const ContentRenderer: React.FC<ContentRendererProps> = (props) => {
  const { t, i18n } = useTranslation([props.pageKey]);
  const dispatch = useDispatch()
  const history = useHistory();
  const persistState = useSelector((state: RootState) => state.app.persistState);

  const renderItem = (item: PageItem) => {
    if (shouldHide(item.hideWhen, props.isAuthenticated)) {
      return null;
    }
    switch (item.config.type) {
      case 'markdown':
        return <MarkdownLoader
          key={item.itemKey}
          className={item.className}
          languageCode={i18n.language}
          markdownUrl={getTranslatedMarkdownPath(item.config.markdownUrl, i18n.language)}
          flavor={item.config.flavor}
        />
      case 'teaserImage':
        return <TeaserImage
          key={item.itemKey}
          image={item.config.image}
          textBox={item.config.textBox ? {
            className: item.config.textBox.className,
            title: t(`${item.itemKey}.title`),
            content: t(`${item.itemKey}.content`),
          } : undefined}
        />
      case 'imageCard':
        const action = item.config.action;
        return <ImageCard
          key={item.itemKey}
          className={item.className}
          imageSrc={item.config.imageSrc ? item.config.imageSrc : t(`${item.itemKey}.imageSrc`)}
          imageAlt={t(`${item.itemKey}.imageAlt`)}
          title={t(`${item.itemKey}.title`)}
          body={t(`${item.itemKey}.body`)}
          openActionText={item.config.showActionBtn ? t(`${item.itemKey}.actionLabel`) : undefined}
          onClick={() => {
            if (!action) { return; }
            if (action.type === 'openDialog') {
              dispatch(dialogActions.openDialogWithoutPayload(action.value))
            } else if (action.type === 'navigate') {
              history.push(action.value);
            }
          }}
        />
      case 'image':
        return <ImageContainer
          key={item.itemKey}
        // className={item.className}
        />
      case 'video':
        return <VideoPlayer
          key={item.itemKey + i18n.language}
          className={item.className}
          minHeight={item.config.minHeight}
          posterUrl={item.config.posterUrlKey ? t(`${item.itemKey}.${item.config.posterUrlKey}`) : undefined}
          sources={item.config.videoSources.map((vs:any) => {
            // console.log(t(`${item.itemKey}.${vs.type}`))
            return {
              src: t(`${item.itemKey}.${vs.urlKey}`),
              type: vs.type,
            }
          })}
          fallbackText={item.config.fallbackTextKey ? t(`${item.itemKey}.${item.config.fallbackTextKey}`) : undefined}
        />
      case 'loginCard':
        return <LoginCard
          key={item.itemKey}
          className={item.className}
          title={t(`${item.itemKey}.title`)}
          infoText={item.config.showInfoText ? t(`${item.itemKey}.info`) : undefined}
          emailInputLabel={t(`${item.itemKey}.emailInputLabel`)}
          emailInputPlaceholder={t(`${item.itemKey}.emailInputPlaceholder`)}
          passwordInputLabel={t(`${item.itemKey}.passwordInputLabel`)}
          passwordInputPlaceholder={t(`${item.itemKey}.passwordInputPlaceholder`)}
          rememberMeLabel={t(`${item.itemKey}.rememberMeLabel`)}
          passwordForgottenBtn={t(`${item.itemKey}.passwordForgottenBtn`)}
          signupBtn={t(`${item.itemKey}.signupBtn`)}
          loginBtn={t(`${item.itemKey}.btn`)}
          persistState={persistState}
          onChangePersistState={(checked) => dispatch(setPersistState(checked))}
          onSubmit={(email, password, rememberMe) => {
            dispatch(dialogActions.openLoginDialog({
              type: 'login',
              payload: {
                email,
                password,
                rememberMe,
              }
            }))
          }}
          onOpenDialog={(dialog) => dispatch(dialogActions.openDialogWithoutPayload(dialog))}
        />
      case 'accordionList':
        const items = t(`${item.itemKey}`, { returnObjects: true }) as Array<{ title: string; content: string; }>;
        return <AccordionList
          key={item.itemKey}
          items={items}
          openLabel={t(`${item.config.accordionCtrlsKey}.open`)}
          closeLabel={t(`${item.config.accordionCtrlsKey}.close`)}
        />
      case 'simpleCard':
        return <SimpleCard
          key={item.itemKey}
          className={item.className}
          title={t(`${item.itemKey}.title`)}
          content={t(`${item.itemKey}.content`)}
          variant={item.config.variant}
        />
      case 'systemInfo':
        return <SystemInfo
          key={item.itemKey}
          itemKey={item.itemKey}
          showBrowserInfo={item.config.showBrowserInfo}
        />
      case 'accountSettings':
        return <AccountSettings
          key={item.itemKey}
          itemKey={item.itemKey}
        />
      case 'communicationSettings':
        return <CommunicationSettings
          key={item.itemKey}
          itemKey={item.itemKey}
          hideLanguageSelector={item.config.hideLanguageSelector}
        />
      case 'deleteAccount':
        return <DeleteAccount
          key={item.itemKey}
          itemKey={item.itemKey}
        />
      case 'logoCredits':
        return <LogoCredits
          key={item.itemKey}
          itemKey={item.itemKey}
          className={item.className}
          containerClassName={item.config.className}
          useTitle={item.config.useTitle}
          images={item.config.images.map((image:any) => {
            image.altKey = t(`${item.itemKey}.${image.altKey}`);
            return image
          })}
          title={item.config.useTitle ? t(`${item.itemKey}.title`) : undefined}
        />
      case 'linkList':
        return <LinkList
          key={item.itemKey}
          className={item.className}
          title={t(`${item.itemKey}.title`)}
          items={item.config.links.map((link:any) => {
            return {
              label: t(`${item.itemKey}.${link.linkKey}`),
              type: link.type,
              value: link.value
            }
          })}
          onChangeLanguage={(code: string) => i18n.changeLanguage(code)}
          onNavigate={(url) => history.push(url)}
          onOpenExternalPage={handleOpenExternalPage}
          onOpenDialog={dialog => dispatch(dialogActions.openDialogWithoutPayload(dialog))}
        />
      case 'mapDataSeries':
        return <MapWithTimeSliderLoader
          key={item.itemKey}
          mapUrl={item.config.mapUrl}
          dataUrl={item.config.dataUrl}
        />
      case 'lineWithScatterChart':
        return <ComposedLineAndScatterChartLoader
          key={item.itemKey}
          language={i18n.language}
          dataUrl={item.config.dataUrl}
        />
      case 'surveyList':
        return <SurveyList
          key={item.itemKey}
          className={item.className}
          pageKey={props.pageKey}
          itemKey={item.itemKey}
          defaultRoutes={props.defaultRoutes}
        />
      case 'router':
        return <p
          key={item.itemKey}
        >todo</p>

      case 'extension':
        return componentBuilder(item, i18n.language);
    }
    return <div
      key={item.itemKey}
      className={item.className}>
      {item.itemKey}
    </div>
  }

  const renderColumn = (col: PageColumn, index: number) => {
    if (shouldHide(col.hideWhen, props.isAuthenticated)) {
      return null;
    }
    return <div
      className={col.className}
      key={col.key ? col.key : index.toFixed()}>
      {col.items.map(item => renderItem(item))}
    </div>
  }

  return (
    <React.Fragment>
      <TitleBar
        content={t('title')}
      />
      {props.rows.map(row => {
        if (shouldHide(row.hideWhen, props.isAuthenticated)) {
          return null;
        }
        return <div
          key={row.key}
          className={clsx(
            {
              [containerClassName]: !row.fullWidth,
              "container-fluid": row.fullWidth
            },
            row.className)}
        >
          <div className="row">
            {row.columns.map((col, index) => renderColumn(col, index))}
          </div>
        </div>
      }
      )}
    </React.Fragment>
  );
};

export default ContentRenderer;
