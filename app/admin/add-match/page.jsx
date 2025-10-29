"use client";

import React from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { showToast } from "@/app/component/application/tostify";
import axios from "axios";
import {
  MatchType1,
  MatchType2,
  MatchType3,
  MatchType4,
  MatchType5,
  MatchType6,
} from "@/config";

export default function TournamentForm() {
  const form = useForm({
    defaultValues: {
      title: "Solo Time | Mobile | Regular",
      matchType: "",
      startTime: "",
      winPrize: 405,
      perKill: 5,
      entryFee: 10,
      entryType: "Solo",
      map: "Bermuda",
      joined: 0,
      totalSpots: 48,
    },
  });

  const onSubmit = async (data) => {
    showToast("success", "added");

    try {
      const res = await axios.post("/api/addMatch", { data });
      if (!res) {
        showToast("error", res.message);
      }
    } catch (err) {
      showToast("error", err.error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 max-w-lg mx-auto p-4 border rounded"
      >
        {/* Title */}
        <FormField
          control={form.control}
          name="title"
          rules={{ required: "Title is required" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="matchType"
          rules={{ required: "Select Match Type" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Match Type</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Match" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={MatchType1}>{MatchType1}</SelectItem>
                  <SelectItem value={MatchType2}>{MatchType2}</SelectItem>
                  <SelectItem value={MatchType3}>{MatchType3}</SelectItem>
                  <SelectItem value={MatchType4}>{MatchType4}</SelectItem>
                  <SelectItem value={MatchType5}>{MatchType5}</SelectItem>
                  <SelectItem value={MatchType6}>{MatchType6}</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Date & Time */}
        <FormField
          control={form.control}
          name="startTime"
          rules={{ required: "Date & Time is required" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date & Time</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="datetime-local"
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Win Prize */}
        <FormField
          control={form.control}
          name="winPrize"
          rules={{ required: "Win Prize is required" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Win Prize</FormLabel>
              <FormControl>
                <Input {...field} type="number" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Per Kill */}
        <FormField
          control={form.control}
          name="perKill"
          rules={{ required: "Per Kill is required" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Per Kill</FormLabel>
              <FormControl>
                <Input {...field} type="number" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Entry Fee */}
        <FormField
          control={form.control}
          name="entryFee"
          rules={{ required: "Entry Fee is required" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Entry Fee</FormLabel>
              <FormControl>
                <Input {...field} type="number" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Entry Type & Map */}
        <div className="flex gap-3">
          {/* Entry Type */}
          <div className="flex-1">
            <FormField
              control={form.control}
              name="entryType"
              rules={{ required: "Entry Type is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Entry Type</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select entry type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Solo">Solo</SelectItem>
                        <SelectItem value="Duo">Duo</SelectItem>
                        <SelectItem value="Squad">Squad</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Map */}
          <div className="flex-1">
            <FormField
              control={form.control}
              name="map"
              rules={{ required: "Map is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Map Name</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Map" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Bermuda">Bermuda</SelectItem>
                        <SelectItem value="Bermuda 2.0">Bermuda 2.0</SelectItem>
                        <SelectItem value="Kalahari">Kalahari</SelectItem>
                        <SelectItem value="Purgatory">Purgatory</SelectItem>
                        <SelectItem value="Alpine">Alpine</SelectItem>
                        <SelectItem value="NeXTerra">NeXTerra</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Total Spots */}
        <FormField
          control={form.control}
          name="totalSpots"
          rules={{ required: "Total Spots is required" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Total Spots</FormLabel>
              <FormControl>
                <Input {...field} type="number" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button type="submit" className="w-full mt-4">
          Save Tournament
        </Button>
      </form>
    </Form>
  );
}
