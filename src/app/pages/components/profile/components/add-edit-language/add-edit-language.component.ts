import { CheckValidityService } from '../../../../../shared/services/check-validity/check-validity.service';
import { PublicService } from '../../../../../shared/services/public.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AlertsService } from 'src/app/core/services/alerts/alerts.service';
import { ProfileService } from '../../../../services/profile.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/pages/services/home.service';
import { Validators, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-add-edit-language',
  templateUrl: './add-edit-language.component.html',
  styleUrls: ['./add-edit-language.component.scss']
})
export class AddEditLanguageComponent implements OnInit {
  private unsubscribe: Subscription[] = [];

  userProfileDetails: any;
  isLoading: boolean = false;
  modalData: any;

  levels: any = [];
  languages: any = [];
  isLoadingLanguages: boolean = false;
  type: any;
  id: any;
  data: any;

  profileForm = this.fb?.group(
    {
      language: [
        null,
        {
          validators: [
            Validators.required,
          ]
        },
      ],
      level: [
        null,
        {
          validators: [
            Validators.required,
          ]
        },
      ]
    }
  );
  get formControls(): any {
    return this.profileForm?.controls;
  }

  constructor(
    private checkValidityService: CheckValidityService,
    private profileService: ProfileService,
    private alertsService: AlertsService,
    public publicService: PublicService,
    private config: DynamicDialogConfig,
    private homeService: HomeService,
    private cdr: ChangeDetectorRef,
    private ref: DynamicDialogRef,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.levels = this.publicService?.getLevels();
    this.languages = this.publicService?.getLanguages();
    this.modalData = this.config?.data;
    this.type = this.modalData?.type;
    this.id = this.modalData?.id;
    if (this.type == 'edit') {
      this.getProfileDetails();
    } else {
      this.getLanguages();
    }
  }
  getProfileDetails() {
    this.isLoading = true;
    this.homeService.getProfileDetails().subscribe((res: any) => {
      if (res) {
        this.userProfileDetails = res.data.user;
        this.userProfileDetails?.languages?.forEach((item: any) => {
          if (item?._id == this.id) {
            this.data = item;
          }
        });
        this.patchValue();
        this.getLanguages();
        this.isLoading = false;
      } else {
        this.isLoading = false;
      }
    })
  }
  patchValue(): void {
    let level: any;
    this.levels?.forEach((item: any) => {
      if (item?._id == this.data?.proficiency_Levels) {
        level = item;
      }
    });
    let language: any;
    this.levels?.forEach((item: any) => {
      if (item?._id == this.data?.language?._id) {
        language = item;
      }
    });
    this.profileForm?.patchValue({
      level: level,
      language: language
    });
  }
  getLanguages(): any {
    this.isLoadingLanguages = true;
    this.profileService?.getLanguages()?.subscribe(
      (res: any) => {
        if (res?.status == 200) {
          let arr: any = [];
          arr = res?.data?.languages ? res?.data?.languages : [];
          this.languages = arr;
          this.isLoadingLanguages = false;

          this.languages?.forEach((item: any) => {
            if (item?.name == this.data?.language?.name) {
              this.profileForm?.patchValue({
                language: item
              })
            }
          });
        } else {
          res?.message ? this.alertsService?.openSweetAlert('info', res?.message) : '';
          this.isLoadingLanguages = false;
        }
      },
      (err: any) => {
        err?.message ? this.alertsService?.openSweetAlert('error', err?.message) : '';
        this.isLoadingLanguages = false;
      });
    this.cdr?.detectChanges();
  }
  submit(): void {
    if (this.profileForm?.valid) {
      this.publicService?.show_loader?.next(true);
      let formInfo: any = this.profileForm?.value;
      let data = {
        proficiency_Levels: formInfo?.level?._id,
        language: formInfo?.language?._id,
      };
      this.profileService?.addEditLanguage(data, this.id ? this.id : null)?.subscribe(
        (res: any) => {
          if (res?.status == 200) {
            this.ref?.close({ listChanged: true });
            this.publicService?.show_loader?.next(false);
          } else {
            this.publicService?.show_loader?.next(false);
            res?.error?.message
              ? this.alertsService?.openSweetAlert('error', res?.error?.message)
              : '';
          }
        },
        (err: any) => {
          err ? this.alertsService?.openSweetAlert('error', err) : '';
          this.publicService?.show_loader?.next(false);
        }
      );
    } else {
      this.checkValidityService?.validateAllFormFields(this.profileForm);
    }
    this.cdr?.detectChanges();
  }
  remove(): void {
    this.publicService?.show_loader?.next(true);
    this.profileService?.deleteLanguage(this.id)?.subscribe(
      (res: any) => {
        if (res?.status == 200) {
          this.ref?.close({ listChanged: true });
          this.publicService?.show_loader?.next(false);
        } else {
          this.publicService?.show_loader?.next(false);
          res?.error?.message
            ? this.alertsService?.openSweetAlert('error', res?.error?.message)
            : '';
        }
      },
      (err: any) => {
        err ? this.alertsService?.openSweetAlert('error', err) : '';
        this.publicService?.show_loader?.next(false);
      }
    );
    this.cdr?.detectChanges();
  }
  cancel(): void {
    this.ref?.close();
  }

  ngOnDestroy(): void {
    this.unsubscribe?.forEach((sb) => sb?.unsubscribe());
  }
}
