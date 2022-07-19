import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { IReportDataPayload } from 'src/app/core/models/IReportDataPayload';
import { CommonService } from 'src/app/core/services/common/common.service';
import { ConfigService } from 'src/app/core/services/config/config.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-udise',
  templateUrl: './udise.component.html',
  styleUrls: ['./udise.component.scss']
})
export class UdiseComponent implements OnInit {
  udiseMetricsData: any;
  udiseStateData: any;
  filters: any;
  metricFilter: any;
  levels: any;
  isMapReportLoading = true;

  constructor(private readonly _configService: ConfigService, private readonly _commonService: CommonService, private readonly _spinner: NgxSpinnerService) {
    this.getUdiseMetricsData();
    this.getUdiseStateData(this.filters, this.levels, this.metricFilter);
  }

  ngOnInit(): void {
  }
  
  onTabChanged($event: any): void {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
      console.log('resize');
    }, 100);
  }

  getUdiseMetricsData() {
    this._configService.getVanityMetrics('udise').subscribe(vanityMetricsRes => {
      this.udiseMetricsData = vanityMetricsRes.result;
    });
  }

  getUdiseStateData(filters:any, levels:any, metricFilter: any) {
    let data: IReportDataPayload = {
      appName: environment.config.toLowerCase(),
      dataSourceName: 'udise',
      reportName: 'udise_performance',
      reportType: 'map',
      stateCode: environment.stateCode,
      filters,
      levels,
      metricFilter
    };

    this._commonService.getReportData(data).subscribe(res => {
      this._spinner.hide();
      this.isMapReportLoading = false;
      this.udiseStateData = res.result;
      this.filters = res.result.filters;
      this.levels = res.result.levels;
      this.metricFilter = res.result.metricFilter;
    }, err => {
      this.isMapReportLoading = false;
    });
  }

  filtersUpdated(filters: any): void {
    this.getUdiseStateData(filters, this.levels, this.metricFilter);
  }

  onSelectMetricFilter(metricFilter: any): void {
    this.getUdiseStateData(this.filters, this.levels, metricFilter);
  }

  onSelectLevel(event: any): void {
    this.getUdiseStateData(this.filters, event.items, this.metricFilter);
  }
}
