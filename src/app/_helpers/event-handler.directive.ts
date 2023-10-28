import {Directive, HostListener} from "@angular/core";

@Directive({
    standalone:true,
    selector: "[click-stop-propagation]"
})
export class ClickStopPropagation
{
    @HostListener("click", ["$event"])
    public onClick(event: any): void
    {
        event.stopPropagation();
    }
}
