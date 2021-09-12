import { Component, Host, h, ComponentInterface, Prop, State } from '@stencil/core';

@Component({
  tag: 's-datepicker',
  styleUrl: 's-datepicker.css',
  shadow: true,
})
export class SDatepicker implements ComponentInterface {

  @State() isPopoverHidden = true;

  @Prop() value: Date = new Date();

  render() {
    const currentMonth = this.value.getMonth();
    const currentYear = this.value.getFullYear();
    const lastDateOfCurrentMonth = new Date(this.value.getFullYear(), currentMonth + 1, 0).getDate();
    const firstDayOfCurrentMonth = new Date(this.value.getFullYear(), currentMonth, 1).getDay();
    const datesInCurrentMonth = [...Array(lastDateOfCurrentMonth).keys()].map(day => day + 1);
    const lastDateOfPreviousMonth = new Date(this.value.getFullYear(), currentMonth, 0).getDate();
    const datesInCalender = datesInCurrentMonth.map(date => ({ day: date, month: currentMonth, year: currentYear }));
    for (let i = 0; i < firstDayOfCurrentMonth; i++) {
      datesInCalender.unshift({ day: lastDateOfPreviousMonth - i, month: currentMonth - 1, year: currentYear });
    }
    const daysFromNextMonth = 7 - datesInCalender.length % 7;
    for (let i = 1; i <= daysFromNextMonth; i++) {
      datesInCalender.push({ day: i, month: currentMonth + 1, year: currentYear });
    }

    return (
      <Host>
        <div id="main-container" onClick={() => this.isPopoverHidden = !this.isPopoverHidden}>
          {`${this.value.getFullYear()} - ${`0${this.value.getMonth() + 1}`.slice(-2)} - ${this.value.getDate()}`}
          <s-popover
            isHidden={this.isPopoverHidden}
            position={{
              x: '0',
              y: 'calc(100% + .5rem)',
              offsetX: '0',
              offsetY: '0'
            }}
            transformOrigin="top"
          >
            <div>
              <table style={{ height: '100%', width: '100%' }}>
                <thead>
                  <tr>
                    {
                      ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(label => (
                        <th>{label}</th>
                      ))
                    }
                  </tr>
                </thead>
                <tbody>
                  {
                    [...Array(datesInCalender.length / 7).keys()].map(week => (
                      <tr>
                        {
                          [...Array(7).keys()].map(dayOfWeek => {
                            const date = datesInCalender[week * 7 + dayOfWeek];
                            const isTheSelectedMonth = date.month === currentMonth;
                            const isTheSelectedDate = date.day === this.value.getDate() && isTheSelectedMonth && date.year === currentYear;
                            return (
                              <td style={{
                                color: isTheSelectedMonth ? 'black' : 'grey',
                                backgroundColor: isTheSelectedDate ? 'deepskyblue' : ''
                              }}>{date.day}</td>
                            );
                          })
                        }
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </s-popover>
        </div>
      </Host>
    );
  }

}
