// @ts-nocheck
function stryNS_9fa48() {
  var g = typeof globalThis === 'object' && globalThis && globalThis.Math === Math && globalThis || new Function("return this")();
  var ns = g.__stryker__ || (g.__stryker__ = {});
  if (ns.activeMutant === undefined && g.process && g.process.env && g.process.env.__STRYKER_ACTIVE_MUTANT__) {
    ns.activeMutant = g.process.env.__STRYKER_ACTIVE_MUTANT__;
  }
  function retrieveNS() {
    return ns;
  }
  stryNS_9fa48 = retrieveNS;
  return retrieveNS();
}
stryNS_9fa48();
function stryCov_9fa48() {
  var ns = stryNS_9fa48();
  var cov = ns.mutantCoverage || (ns.mutantCoverage = {
    static: {},
    perTest: {}
  });
  function cover() {
    var c = cov.static;
    if (ns.currentTestId) {
      c = cov.perTest[ns.currentTestId] = cov.perTest[ns.currentTestId] || {};
    }
    var a = arguments;
    for (var i = 0; i < a.length; i++) {
      c[a[i]] = (c[a[i]] || 0) + 1;
    }
  }
  stryCov_9fa48 = cover;
  cover.apply(null, arguments);
}
function stryMutAct_9fa48(id) {
  var ns = stryNS_9fa48();
  function isActive(id) {
    if (ns.activeMutant === id) {
      if (ns.hitCount !== void 0 && ++ns.hitCount > ns.hitLimit) {
        throw new Error('Stryker: Hit count limit reached (' + ns.hitCount + ')');
      }
      return true;
    }
    return false;
  }
  stryMutAct_9fa48 = isActive;
  return isActive(id);
}
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import { Card, CardHeader, CardTitle, CardContent } from '@/shared/components/Card';
import { Input } from '@/shared/components/Input';
import { Button } from '@/shared/components/Button';
import { useUserSettingsQuery, useUpdateUserSettingsMutation } from '../hooks/use-settings';
const settingsSchema = z.object(stryMutAct_9fa48("118") ? {} : (stryCov_9fa48("118"), {
  name: stryMutAct_9fa48("119") ? z.string().max(1, 'settings.validation.nameRequired') : (stryCov_9fa48("119"), z.string().min(1, stryMutAct_9fa48("120") ? "" : (stryCov_9fa48("120"), 'settings.validation.nameRequired'))),
  email: z.string().regex(stryMutAct_9fa48("131") ? /^[^\s@]+@[^\s@]+\.[^\S@]+$/ : stryMutAct_9fa48("130") ? /^[^\s@]+@[^\s@]+\.[\s@]+$/ : stryMutAct_9fa48("129") ? /^[^\s@]+@[^\s@]+\.[^\s@]$/ : stryMutAct_9fa48("128") ? /^[^\s@]+@[^\S@]+\.[^\s@]+$/ : stryMutAct_9fa48("127") ? /^[^\s@]+@[\s@]+\.[^\s@]+$/ : stryMutAct_9fa48("126") ? /^[^\s@]+@[^\s@]\.[^\s@]+$/ : stryMutAct_9fa48("125") ? /^[^\S@]+@[^\s@]+\.[^\s@]+$/ : stryMutAct_9fa48("124") ? /^[\s@]+@[^\s@]+\.[^\s@]+$/ : stryMutAct_9fa48("123") ? /^[^\s@]@[^\s@]+\.[^\s@]+$/ : stryMutAct_9fa48("122") ? /^[^\s@]+@[^\s@]+\.[^\s@]+/ : stryMutAct_9fa48("121") ? /[^\s@]+@[^\s@]+\.[^\s@]+$/ : (stryCov_9fa48("121", "122", "123", "124", "125", "126", "127", "128", "129", "130", "131"), /^[^\s@]+@[^\s@]+\.[^\s@]+$/), stryMutAct_9fa48("132") ? "" : (stryCov_9fa48("132"), 'settings.validation.emailInvalid')),
  notifications: z.boolean()
}));
type SettingsFormData = z.infer<typeof settingsSchema>;
export function SettingsPage() {
  if (stryMutAct_9fa48("133")) {
    {}
  } else {
    stryCov_9fa48("133");
    const {
      t
    } = useTranslation();
    const settingsQuery = useUserSettingsQuery();
    const updateMutation = useUpdateUserSettingsMutation();
    const [submissionError, setSubmissionError] = useState<string | null>(null);
    const {
      register,
      handleSubmit,
      reset,
      formState: {
        errors,
        isSubmitting
      }
    } = useForm<SettingsFormData>(stryMutAct_9fa48("134") ? {} : (stryCov_9fa48("134"), {
      resolver: zodResolver(settingsSchema),
      mode: stryMutAct_9fa48("135") ? "" : (stryCov_9fa48("135"), 'onSubmit')
    }));
    const nameError = stryMutAct_9fa48("136") ? errors.name.message : (stryCov_9fa48("136"), errors.name?.message);
    const emailError = stryMutAct_9fa48("137") ? errors.email.message : (stryCov_9fa48("137"), errors.email?.message);
    useEffect(() => {
      if (stryMutAct_9fa48("138")) {
        {}
      } else {
        stryCov_9fa48("138");
        if (stryMutAct_9fa48("140") ? false : stryMutAct_9fa48("139") ? true : (stryCov_9fa48("139", "140"), settingsQuery.data)) {
          if (stryMutAct_9fa48("141")) {
            {}
          } else {
            stryCov_9fa48("141");
            reset(settingsQuery.data);
          }
        }
      }
    }, stryMutAct_9fa48("142") ? [] : (stryCov_9fa48("142"), [settingsQuery.data, reset]));
    const onSubmit = async (data: SettingsFormData) => {
      if (stryMutAct_9fa48("143")) {
        {}
      } else {
        stryCov_9fa48("143");
        setSubmissionError(null);
        try {
          if (stryMutAct_9fa48("144")) {
            {}
          } else {
            stryCov_9fa48("144");
            await updateMutation.mutateAsync(data);
          }
        } catch (error) {
          if (stryMutAct_9fa48("145")) {
            {}
          } else {
            stryCov_9fa48("145");
            console.error(stryMutAct_9fa48("146") ? "" : (stryCov_9fa48("146"), 'Failed to update settings'), error);
            setSubmissionError(t(stryMutAct_9fa48("147") ? "" : (stryCov_9fa48("147"), 'settings.updateError')));
          }
        }
      }
    };
    if (stryMutAct_9fa48("149") ? false : stryMutAct_9fa48("148") ? true : (stryCov_9fa48("148", "149"), settingsQuery.isPending)) {
      if (stryMutAct_9fa48("150")) {
        {}
      } else {
        stryCov_9fa48("150");
        return <section className="p-8">
        <p>{t(stryMutAct_9fa48("151") ? "" : (stryCov_9fa48("151"), 'settings.loading'))}</p>
      </section>;
      }
    }
    if (stryMutAct_9fa48("153") ? false : stryMutAct_9fa48("152") ? true : (stryCov_9fa48("152", "153"), settingsQuery.isError)) {
      if (stryMutAct_9fa48("154")) {
        {}
      } else {
        stryCov_9fa48("154");
        return <section className="p-8">
        <div role="alert" className="rounded-md border border-destructive bg-destructive/10 p-4 text-destructive">
          {t(stryMutAct_9fa48("155") ? "" : (stryCov_9fa48("155"), 'settings.loadError'))}
        </div>
      </section>;
      }
    }
    return <section className="p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">{t(stryMutAct_9fa48("156") ? "" : (stryCov_9fa48("156"), 'settings.title'))}</h1>
        <p className="text-muted-foreground">
          {t(stryMutAct_9fa48("157") ? "" : (stryCov_9fa48("157"), 'settings.subtitle'))}
        </p>
      </header>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>{t(stryMutAct_9fa48("158") ? "" : (stryCov_9fa48("158"), 'settings.profileSettings'))}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                {t(stryMutAct_9fa48("159") ? "" : (stryCov_9fa48("159"), 'settings.name'))}
              </label>
              <Input id="name" {...register(stryMutAct_9fa48("160") ? "" : (stryCov_9fa48("160"), 'name'))} />
              {stryMutAct_9fa48("163") ? nameError || <p className="mt-1 text-sm text-destructive">
                  {t(nameError as never)}
                </p> : stryMutAct_9fa48("162") ? false : stryMutAct_9fa48("161") ? true : (stryCov_9fa48("161", "162", "163"), nameError && <p className="mt-1 text-sm text-destructive">
                  {t(nameError as never)}
                </p>)}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                {t(stryMutAct_9fa48("164") ? "" : (stryCov_9fa48("164"), 'settings.email'))}
              </label>
              <Input id="email" {...register(stryMutAct_9fa48("165") ? "" : (stryCov_9fa48("165"), 'email'))} />
              {stryMutAct_9fa48("168") ? emailError || <p className="mt-1 text-sm text-destructive">
                  {t(emailError as never)}
                </p> : stryMutAct_9fa48("167") ? false : stryMutAct_9fa48("166") ? true : (stryCov_9fa48("166", "167", "168"), emailError && <p className="mt-1 text-sm text-destructive">
                  {t(emailError as never)}
                </p>)}
            </div>

            <div className="flex items-center gap-2">
              <input id="notifications" type="checkbox" {...register(stryMutAct_9fa48("169") ? "" : (stryCov_9fa48("169"), 'notifications'))} className="h-4 w-4" />
              <label htmlFor="notifications" className="text-sm font-medium">
                {t(stryMutAct_9fa48("170") ? "" : (stryCov_9fa48("170"), 'settings.notifications'))}
              </label>
            </div>

            {stryMutAct_9fa48("173") ? submissionError || <div role="alert" className="rounded-md border border-destructive bg-destructive/10 p-3 text-sm text-destructive">
                {submissionError}
              </div> : stryMutAct_9fa48("172") ? false : stryMutAct_9fa48("171") ? true : (stryCov_9fa48("171", "172", "173"), submissionError && <div role="alert" className="rounded-md border border-destructive bg-destructive/10 p-3 text-sm text-destructive">
                {submissionError}
              </div>)}

            {stryMutAct_9fa48("176") ? updateMutation.isSuccess || <output className="block rounded-md border border-primary bg-primary/10 p-3 text-sm text-primary">
                {t('settings.updateSuccess')}
              </output> : stryMutAct_9fa48("175") ? false : stryMutAct_9fa48("174") ? true : (stryCov_9fa48("174", "175", "176"), updateMutation.isSuccess && <output className="block rounded-md border border-primary bg-primary/10 p-3 text-sm text-primary">
                {t(stryMutAct_9fa48("177") ? "" : (stryCov_9fa48("177"), 'settings.updateSuccess'))}
              </output>)}

            <Button type="submit" disabled={stryMutAct_9fa48("180") ? isSubmitting && updateMutation.isPending : stryMutAct_9fa48("179") ? false : stryMutAct_9fa48("178") ? true : (stryCov_9fa48("178", "179", "180"), isSubmitting || updateMutation.isPending)} className="w-full">
              {(stryMutAct_9fa48("183") ? isSubmitting && updateMutation.isPending : stryMutAct_9fa48("182") ? false : stryMutAct_9fa48("181") ? true : (stryCov_9fa48("181", "182", "183"), isSubmitting || updateMutation.isPending)) ? t(stryMutAct_9fa48("184") ? "" : (stryCov_9fa48("184"), 'settings.saving')) : t(stryMutAct_9fa48("185") ? "" : (stryCov_9fa48("185"), 'settings.saveChanges'))}
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>;
  }
}